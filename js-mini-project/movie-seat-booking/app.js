const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // console.log(selectedSeats);

  // 定义座位数组
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat)
  })

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))



  const selectedSeatsCount = selectedSeats.length;

  console.log(selectedSeatsCount);

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// 更新座位选择信息
movieSelect.addEventListener('change', e => {
  ticketPrice = e.target.value
  updateSelectedCount();
})

// 座位选择
container.addEventListener('click', (e) => {
  // console.log(e.target);
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    console.log(e.target);
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
})