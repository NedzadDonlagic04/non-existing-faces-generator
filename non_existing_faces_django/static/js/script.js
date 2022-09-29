$("#generateForm").submit(function(e) {
    e.preventDefault();
    var form = $(this);

    $.ajax({
        type:'POST',
        url:'/',
        data:form.serialize(),
        success: function(data) {
            console.log(data); // This is temporary
        }
    });
});

/* Flip Animation Related Stuff */

const card = document.querySelector('.card');
const button = document.querySelector('button');

const img1 = document.querySelector('#img1');
const img2 = document.querySelector('#img2');

const getImg = async img => {
    await fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            img.setAttribute('src', data.message);
        });
}

getImg(img1);
getImg(img2);

button.addEventListener('click', () => {
    button.disabled = true;
  
    if(card.classList.contains('flipOnce'))
    {
        card.classList.remove('flipOnce');
        card.classList.add('flipTwice');
    }
    else if(!card.classList.contains('flipOnce'))
    {
        if(card.classList.contains('reset'))
        {
            card.classList.remove('reset');
        }
        card.classList.add('flipOnce');
    }
});

card.addEventListener('transitionend', () => {
    button.disabled = false;
  
    if(card.classList.contains('flipTwice'))
    {
        getImg(img2);
        card.classList.remove('flipTwice');
        card.classList.add('reset');
    }
    else if(card.classList.contains('flipOnce'))
    {
        getImg(img1);
    }
});