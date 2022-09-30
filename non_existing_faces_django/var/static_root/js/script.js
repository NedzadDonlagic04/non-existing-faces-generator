/* Flip Animation Related Stuff */
const img1 = document.querySelector('#img1');
const img2 = document.querySelector('#img2');

let img = img1;

const setImg = (img, src) => {
    img.setAttribute('src', src);
}

const card = document.querySelector('.card');
const button = document.querySelector('#clickMe');

let btnStatus = false;

/* Ajax Related Stuff */
$("#generateForm").submit(function(e) {
    e.preventDefault();
    var form = $(this);

    if(!btnStatus)
    {
        img = (img === img1) ? img2 : img1;
        
        btnStatus = true;

        $.ajax({
            type:'POST',
            url:'/',
            data:form.serialize(),
            success: function(data) {
                setImg(img, data);
                
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
            }
        });
    }
});

card.addEventListener('transitionend', () => {
    btnStatus = false;
  
    if(card.classList.contains('flipTwice'))
    {
        card.classList.remove('flipTwice');
        card.classList.add('reset');
    }
});