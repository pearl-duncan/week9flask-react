from . import api
from flask import render_template
from ..models import User, Post, db
from flask_login import current_user
import requests as r

@api.route('/posts')
def all_post_api():
    posts = Post.query.order_by(Post.date_created.desc()).all()
    posts =[p.to_dict() for p in posts]
    return {
        'status':'ok',
        'total_results': len(posts),
        'posts': posts
    }

@api.route('/post/<post_id>')
def single_post_api(post_id):
    post = Post.query.get(post)
    if post:
        return {
            'status': 'ok',
            'total_results': 1, 
            'post': post.to_dict()
        }
    return {
        'status': 'not ok',
        'message': ' A post with that ID does not exist'
    }
    

@api.route('/people')
def people_page():
    users = User.query.order_by(User.username).filter(User.username != current_user.username).all()
    current_user.get_following()
    return render_template('people.html', users=users)
