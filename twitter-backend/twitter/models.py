from django.db import models
from django.utils import timezone

# Create your models here.
class Post(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    created_date = models.DateTimeField(default=timezone.now)
    updated_date = models.DateTimeField(default=timezone.now)
    reference = models.ForeignKey('Post', null=True, on_delete=models.CASCADE)
    likes = models.ManyToManyField('auth.User', blank=True, related_name='likes', 
        through='Like')

    def update(self):
        self.updated_date = timezone.now()
        self.save()

    @property
    def like_count(self):
        return self.likes.count()

class Like(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_date = models.DateTimeField(default=timezone.now)

class Comment(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    created_date = models.DateTimeField(default=timezone.now)