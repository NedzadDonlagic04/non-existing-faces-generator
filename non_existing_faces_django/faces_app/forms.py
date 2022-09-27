from django import forms

class GeneratorForm(forms.Form):
    effects = forms.BooleanField(initial=False,required=False)