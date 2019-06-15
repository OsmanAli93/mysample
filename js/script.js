
// TYPEWRITER WORDS

let words = ['Coder', 'Blogger', 'Freelancer', 'Developer', 'Photographer'],
    count = 0,
    txt = '',
    isDeleting = false,
    wait = 3000,
    typeSpeed = 50;


function typeWriter () {

    const current = count % words.length;
    const fullText = words[current];

    if (isDeleting) {
        txt = fullText.substring(0 , txt.length - 1);
        typeSpeed = 50;
    } else {
        txt = fullText.substring(0, txt.length + 1);
    }

    if (!isDeleting && txt === fullText) {
        
        typeSpeed = wait;

        isDeleting = true;

    } else if (isDeleting && txt === '') {

        typeSpeed = 50;

        isDeleting = false;
        
        count++;
    }

    document.querySelector('#typed-title').innerHTML = `${txt}`;

    setTimeout(typeWriter, typeSpeed);
}


document.addEventListener('DOMContentLoaded', typeWriter);

// LIGHTBOX GALLERY

let index = 0,
    modalItem = document.querySelectorAll('.modal-item'),
    modalPrev = document.querySelector('.arrow-prev'),
    workItem = document.querySelectorAll('.work-item'),
    modalNext = document.querySelector('.arrow-next'),
    modalContainer = document.querySelector('.modal-container'),
    modalCloseBtn = document.querySelector('.close-btn'),
    filterBtnContainer = document.querySelector('.filter-btn__container'),
    filterBtn = filterBtnContainer.querySelectorAll('a');


function lightBoxGalleryNext () {

    const current = index % modalItem.length;

    modalItem.forEach(item => {
        item.className = item.className.replace(' active', '');
    })

    index++;

    modalItem[current].className += ' active';
    
}


function lightBoxGalleryPrev () {

    const current = index % modalItem.length;

    if (current < 1) {index = modalItem.length};

    modalItem.forEach(item => {
        item.className = item.className.replace(' active', '');
    })
    
    index--;

    modalItem[current].className += ' active';

}

function lightBoxGalleryClick (e) {
    const itemIndex = this.dataset.index;

    modalItem.forEach(item => {
        item.className = item.className.replace(' active', '');
    })

    index = itemIndex;

    document.querySelector('.modal').style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
    modalItem[index].className += ' active';
   
    e.preventDefault();
}

function closeModalonClick (e) {

    if (e.target.matches('.modal-container')) {
      
        document.querySelector('.modal').style.display = 'none';
        document.querySelector('body').style.overflow = 'auto';
    } 
     
}

function closeModalByBtn () {

    const btnContainer = document.querySelector('.modal');
    btnContainer.style.display = 'none';
    document.querySelector('body').style.overflow = 'auto';
} 


function filterItems (e) {

    e.preventDefault();
    
    const targetData = e.target.dataset.filter;

    filterBtn.forEach(filterBtn => {
        filterBtn.className = filterBtn.className.replace('active', '');
    })


    workItem.forEach(item => {
        if (item.classList.contains(targetData)) {
        
            item.style.display = 'block';

        } else {

            item.style.display = 'none';
        }
    })

    this.classList.add('active');

}

const mobileBtn = document.querySelector('.mobile-menu');
const header = document.querySelector('#main-header');
let mobileMenu = document.querySelector('.mobile-menu__modal');
let isHidden = true;

function toggleMobileMenu () {
    
    mobileMenu.classList.toggle('active');
    mobileBtn.classList.toggle('active');
    
}

function scrollFixedMenu () {
    let pos = document.documentElement.scrollTop || document.body.scrollTop;
    let bars = document.querySelectorAll('.bar');
    let links = document.querySelectorAll('.navbar-item li a');
    
    if (pos >= 50) {
                                                    
        bars.forEach(bar => bar.style.backgroundColor = '#000');
        links.forEach(link => link.style.color = '#000');
        document.querySelector('.logo a').style.color = '#000';
        header.style.backgroundColor = '#fff';
        header.style.padding = '10px 0';
        header.style.boxShadow = '0px 3px 12px rgba(0, 0, 0, 0.05)';
        mobileMenu.style.top = '54px';
        
    } else {
        bars.forEach(bar => bar.style.backgroundColor = '#fff');
        links.forEach(link => link.style.color = '#fff');
        header.style.backgroundColor = 'transparent';
        document.querySelector('.logo a').style.color = '#fff';
        header.style.padding = '30px 0';
        header.style.boxShadow = 'none';
        mobileMenu.style.top = '94px';
    }
}


modalNext.addEventListener('click', lightBoxGalleryNext);
modalPrev.addEventListener('click', lightBoxGalleryPrev);
modalContainer.addEventListener('click', closeModalonClick);
modalCloseBtn.addEventListener('click', closeModalByBtn);
workItem.forEach(workItem => workItem.addEventListener('click', lightBoxGalleryClick));
filterBtn.forEach(btn => btn.addEventListener('click', filterItems));
mobileBtn.addEventListener('click', toggleMobileMenu);
window.addEventListener('scroll', scrollFixedMenu);
