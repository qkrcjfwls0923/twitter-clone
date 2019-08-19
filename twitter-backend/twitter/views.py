import json

from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.views.generic import View, ListView
from django.db.models import Count

from .forms import UserForm, LoginForm
from .models import Post, Like

def ParseRequest(request):
    return json.loads(request.body)

# Create your views here.
class SigninView(View):
    def get(self, request):
        form = UserForm()
        return render(request, 'twitter/signin.html', {'form': form})

    def post(self, request):
        form = LoginForm(request.POST)
        username = request.POST['username']
        password = request.POST['password']
        user = auth.authenticate(username = username, password = password)
        if user is not None:
            auth.login(request, user)
            return redirect("/")
        else:
            return HttpResponse('로그인 실패')

class SingupView(View):
    def get(self, request):
        form = UserForm()
        return render(request, 'twitter/signup.html', {'form': form})

    def post(self, request):
        form = UserForm(request.POST)
        if form.is_valid():
            print(form.cleaned_data)
            new_user = User.objects.create_user(form.cleaned_data['username'], 
                form.cleaned_data['email'], form.cleaned_data['password'])
            auth.login(request, new_user)
            return redirect("/")
        else:
            return HttpResponse('회원가입 실패')
        
class PostListView(ListView):
    model = Post
    context_object_name = "posts"
    template_name = 'twitter/post_list.html'

    def get_queryset(self):
        return super(PostListView, self).get_queryset().order_by('-updated_date')

class PostManagementView(View):
    def get(self, request):
        queryset = Post.objects.order_by('-created_date')[:5]
        posts = list(queryset.values('id', 'author__username', 'content', 'created_date',
            'reference__author__username', 'reference__content', 'reference__created_date')
            .annotate(like_count=Count('likes'), 
                reference__like_count=Count('reference__likes')))
        print(posts)
        return JsonResponse(posts, safe=False)

    def post(self, request):
        author = request.user
        content = request.POST['content']
        Post(author = author, content = content).save()
        return redirect("/")

    def put(self, request):
        pass

    def delete(self, request):
        data = ParseRequest(request)
        target_post = Post.objects.get(id=data["post-id"])
        print(target_post)
        if not request.user.is_authenticated:
            return JsonResponse({
                'success': False,
                'message': 'not signed in'
            })

        if not target_post.author == request.user:
            return JsonResponse({
                'success': False,
                'message': 'not owned user'
            })
        target_post.delete()
        return JsonResponse({
            'success': True
        })

class LikeView(View):
    def post(self, request):
        data = ParseRequest(request)
        id = data['post-id']
        post = get_object_or_404(Post, id=id)
        post_like, post_like_created = post.like_set.get_or_create(user=request.user)

        if not post_like_created:
            post_like.delete()
            message = "좋아요 취소"
        else:
            message = "좋아요"

        context = {
            'success': True,
            'like_count': post.like_count,
            'message': message,
            'username': request.user.username
        }

        return HttpResponse(json.dumps(context), content_type='application/json')

class RetweetView(View):
    def get(self, request):
        id = request.GET['post-id']
        print(id)
        post = get_object_or_404(Post, id=id)
        return render(request, 'twitter/retweet.html', {'target_post': post})

    def post(self, request):
        author = request.user
        content = request.POST['content']
        post_id = request.POST['data-1']
        reference = get_object_or_404(Post, id=post_id)
        Post(author = author, content = content, reference = reference).save()
        return redirect("/")

def logout(request):
    auth.logout(request)
    return redirect('/')