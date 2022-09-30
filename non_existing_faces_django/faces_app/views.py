from django.http import HttpResponse
from django.shortcuts import render
from . import functions
from . import forms

def index(request):
    if request.method == "GET":
        form = forms.GeneratorForm()
        images = functions.get_random_faces()

        return render(request,"index.html",{"form":form,"images":images})

    elif request.method == "POST":
        form = forms.GeneratorForm(request.POST)

        if not form.is_valid():
            return HttpResponse("Invalid form data!",status=422)

        effects = form.cleaned_data.get("effects")
        images = functions.get_random_faces(effects)

        return HttpResponse(images[0])

    return HttpResponse("Invalid request method!",status=400)
