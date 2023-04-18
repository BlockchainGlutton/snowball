import EventBus from '../hook/EventBus';
import { toast } from "react-toastify";

const handelTitle = (title) => {
    document.title = title
}

function Addshrink() {
    let RelBanner = document.querySelector('.classy-nav-container');

    window.addEventListener("scroll", e => {
        if(window.pageYOffset > 86){
          RelBanner.classList.add("sticky");
        }else
        {
            RelBanner.classList.remove("sticky");
        }
    });
}

const addActiveClass = () => {
    let NavToggler = document.querySelector('.navbarToggler');
    if (NavToggler.classList.contains('active')) {
      NavToggler.classList.remove("active");
      OpenMenu()
    }else{
      NavToggler.classList.add("active");
      OpenMenu()
    }
}

const OpenMenu = () => {
    let NavToggler = document.querySelector('.navbarToggler');
    let ClassyMenu = document.querySelector('.classy-menu');
    if (NavToggler.classList.contains('active')) {
      ClassyMenu.classList.add("menu-on");
    }else{
      ClassyMenu.classList.remove("menu-on");
    }
}

const moveSmooth = () => {
  window.scrollTo({
    behavior: "smooth"
  });
};

function loader() {
    let fadeTarget = document.getElementById("preloader");

    function fadeOutEffect() {
        
        var fadeEffect = setInterval(function () {
            if (fadeTarget.style.opacity > 0) {
                fadeTarget.style.opacity -= 0.1;
            } else {
                clearInterval(fadeEffect);
                fadeTarget.style.display = 'none'
            }
        }, 100);
    }

    window.onload = setTimeout(fadeOutEffect , 1000)
}

function connectWallet () {
  EventBus.dispatch("connect-wallet", {});
};

const makeSubStringForAddr = (_str) => {
  if (_str.length > 0) {
    const str_address =
      _str.substring(0, 5) +
      "..." +
      _str.substring(_str.length - 4, _str.length);
    return str_address;
  }
};

function notify (_type, _text) {
  toast(_text, {
    position: "top-right",
    type: _type,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
  });
}

export {
    handelTitle,
    Addshrink,
    addActiveClass,
    OpenMenu,
    moveSmooth,
    connectWallet, 
    makeSubStringForAddr,
    notify,
    loader
};
