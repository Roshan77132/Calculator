const inputUser = document.getElementById('user-input');
const number = document.querySelectorAll('.numbers');
const calculate = document.querySelectorAll('.operations');


number.forEach((item) => {
  item.addEventListener('click', (e) => {
    if (inputUser.innerText === 'NaN' || inputUser.innerText === '0') {
      inputUser.innerText = '';
    }
    inputUser.innerText += e.target.innerHTML.trim();
  });
});
//handling operations
calculate.forEach((item) => {
  item.addEventListener('click', (e) => {
    let value = e.target.innerHTML.trim().toUpperCase();
    let lastChar = inputUser.innerText.slice(-1);

    if (value === '=') {
      try {
        let expr = inputUser.innerText;
        expr = expr.replace(/(\d+(?:\.\d+)?)(\s*[-+*/]\s*)(\d+(?:\.\d+)?)%/g, (match, base, operator, percent) => {
          let calcPercent = (parseFloat(base) * parseFloat(percent)) / 100;
          return `${base}${operator}${calcPercent}`;
        });
        expr = expr.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');

        inputUser.innerText = eval(expr);
      } catch {
        inputUser.innerText = 'NaN';
      }
    } else if (value === 'AC') {
      inputUser.innerText = '0';
    } else if (value === 'DEL') {
      inputUser.innerText = inputUser.innerText.slice(0, -1);
      if (inputUser.innerText.length === 0) {
        inputUser.innerText = '0';
      }
    } else {
      if (!isNaN(lastChar) || lastChar === ')' || lastChar === '%') {
        inputUser.innerText += e.target.innerHTML.trim();
      }
    }
  });
});






 