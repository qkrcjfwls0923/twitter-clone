from django.urls import path, include
from .views import PostListView, PostManagementView, SigninView, SingupView, logout, LikeView, RetweetView

urlpatterns = [
    path('', PostListView.as_view()),
    path('logout', logout, name='logout'),
    path('signin', SigninView.as_view()),
    path('signup', SingupView.as_view()),
    path('post', PostManagementView.as_view()),
    path('like', LikeView.as_view()),
    path('retweet', RetweetView.as_view()),
]
