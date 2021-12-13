var result = document.querySelector('.calc-result h4');

var sex, height, weight, age, ratio;

function calcTotal() {
    var currentDate= new Date().getFullYear();
    var selectedDate = $("#datepicker-13").datepicker({ dateFormat: 'yyyy' }).val();
    age = currentDate - selectedDate;

  if (!sex || !height || !weight || !age || !ratio) {
    result.textContent = '____';
    return;
  }

  if (sex === "male active") {
    result.textContent = Math.round(
      (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
    );
  } else {
    result.textContent = Math.round(
      (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
    );
  }
  
}

function getStaticInformation(parenSelector, activeClass) {
  var elements = document.querySelectorAll(`${parenSelector} div`);
  
  elements.forEach((elem) => {
    elem.addEventListener('click', (e) => {
      if (e.target.getAttribute('data-ratio')) {
        
        ratio = +e.target.getAttribute('data-ratio');
      } else {
        sex = e.target.getAttribute('id');
      }

      //removes active class after click
      elements.forEach((elem) => {
        elem.classList.remove(activeClass);
      });

      e.target.classList.add(activeClass);
      calcTotal();
    });
  });
}

getStaticInformation('#gender', 'active');
getStaticInformation('.calc-big', 'active');

function getDynamicInformation(selector) {
  var input = document.querySelector(selector);

  input.addEventListener('input', () => {
    switch (input.getAttribute('id')) {
      case 'height':
        height = +input.value;
        break;

      case 'weight':
        weight = +input.value;
        break;
    }
    calcTotal();
  });
}

getDynamicInformation('#height');
getDynamicInformation('#weight');

