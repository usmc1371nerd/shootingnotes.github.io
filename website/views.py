from flask import Flask
from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Note
from . import db
import json


views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    if request.method == 'POST':
        note = request.form.get('note')

        if len(note) < 8:
            flash('Note is too short!', category='error')
        else:
            new_note = Note(data=note, user_id= current_user.id)
            db.session.add(new_note)
            db.session.commit()
            flash('Note added!', category='success')

    return render_template("notes.html", user=current_user)
# using JSON to do a request
@views.route('/delete-note', methods=[ 'POST' ])
def delete_note():
   note = json.loads(request.data)
   noteId = note['noteId']
   note = Note.query.get(noteId)  
   if note:
    if note.user_id == current_user.id:
        db.session.delete(note)
        db.session.commit()
    
    return jsonify({})


zero = Blueprint('/zero', __name__)

@views.route ('/zero', methods=['GET', 'POST'])   
@login_required
def zero():
    return render_template("zero.html", user=current_user)

# #     if request.method == 'POST':
# #         bzonote = request.form.get('bzonote')

# #         if len(bzonote) < 8:
# #             flash('Note is too short!', category='error')
# #         else:
# #             new_note = Bzonote(data=bzonote, user_id= current_user.id)
# #             db.session.add(new_note)
# #             db.session.commit()
# #             flash('Note added!', category='success')

    
#     return render_template("bzo.html", user=current_user)

# #     @views.route('/delete-notebzo', methods=[ 'POST' ])
# #     def delete_note():
# #         bzonote = json.loads(request.data)
# #         bzonoteId = bzonote['noteId']
# #         bzonote = Bzonote.query.get(noteId)  
# #         if bzonote:
# #             if bzonote.user_id == current_user.id:
# #                 db.session.delete(note)
# #                 db.session.commit()
            
# #             return jsonify({})

