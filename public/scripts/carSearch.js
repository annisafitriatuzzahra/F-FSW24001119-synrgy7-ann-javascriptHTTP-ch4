document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById('carSearchForm');
  const carListContainer = document.getElementById('carList');
  carListContainer.classList.add('container-sm');
  const btnCari = document.getElementById('btnCari');

  searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const tipeDriver = parseInt(document.getElementById('tipeDriver').value);
    const tanggal = document.getElementById('tanggal').value;
    const waktu = document.getElementById('waktu').value;
    const jumlahPenumpang = document.getElementById('jumlahPenumpang').value;
    const selectedDateTime = new Date(tanggal + 'T' + waktu);

    if (!tipeDriver || !tanggal || !waktu || !jumlahPenumpang) {
      btnCari.disabled = true;
      return;
    }

    btnCari.disabled = false;
    
    const filterer = (car) => {
      const carAvailableAt = new Date(car.availableAt);

      console.log('Selected DateTime:', selectedDateTime);
      console.log('Car Available At:', carAvailableAt);
      console.log('Car Type:', car.typeDriver);

      if (carAvailableAt >= selectedDateTime) {
        return false;
      }
    
      if (car.capacity < jumlahPenumpang) {
        return false;
      }

      if ((tipeDriver === 1 && car.typeDriver !== 1) || (tipeDriver === 2 && car.typeDriver !== 2)) {
        return false; 
      }
    
      return true; 
    };

    const filteredCars = await Binar.listCars(filterer);

    displayCars(filteredCars);
    console.log("Tipe Driver:", tipeDriver);
    console.log("Tanggal:", tanggal);
    console.log("Waktu:", waktu);
    console.log("Jumlah Penumpang:", jumlahPenumpang);
  });

  const inputs = document.querySelectorAll('#tipeDriver, #tanggal, #waktu, #jumlahPenumpang');
  inputs.forEach(input => {
    input.addEventListener('change', function () {
      const tipeDriver = document.getElementById('tipeDriver').value;
      const tanggal = document.getElementById('tanggal').value;
      const waktu = document.getElementById('waktu').value;
      const jumlahPenumpang = document.getElementById('jumlahPenumpang').value;

      if (!tipeDriver || !tanggal || !waktu || !jumlahPenumpang) {
        btnCari.disabled = true;
      } else {
        btnCari.disabled = false;
      }
    });
  });

  function setEqualCardHeight() {
    const rows = document.querySelectorAll('.row-cols-1');
    
    rows.forEach(row => {
      let maxHeight = 0;
      const cards = row.querySelectorAll('.card');
      
      cards.forEach(card => {
        const cardHeight = card.getBoundingClientRect().height;
        if (cardHeight > maxHeight) {
          maxHeight = cardHeight;
        }
      });
      
      cards.forEach(card => {
        card.style.height = `${maxHeight}px`;
      });
    });
  }
  
function displayCars(filteredCars) {
  carListContainer.innerHTML = '';

  const carGrid = document.createElement('div');
  carGrid.classList.add('row', 'row-cols-1', 'row-cols-md-4');

  filteredCars.forEach((car) => {
    console.log("Mobil yang ditambahkan:", car);
    const carElement = document.createElement('div');
    carElement.classList.add('col', 'g-0');

    carElement.innerHTML = `
      <div class="card">
        <img src="${car.image}" class="card-img-top" alt="${car.model}">
        <div class="card-body">
          <p class="card-title font--size-14 fw-bold">${car.model}/${car.type}</p>
          <p class="card-text__rent font--size-16 fw-bold">Rp ${car.rentPerDay}/hari</p>
          <p class="card-text__desc font--size-14">${car.description}</p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <img src="assets/fi_users.svg" alt="Checklist"/>
              <span class="font--size-14">${car.capacity} orang</span>
            </li>
            <li class="list-group-item">
              <img src="assets/fi_settings.svg" alt="Checklist"/>
              <span class="font--size-14">${car.transmission}</span>
            </li>
            <li class="list-group-item">
              <img src="assets/fi_calendar.svg" alt="Checklist"/>
              <span class="font--size-14">Tahun ${car.year}</span>
            </li>
          </ul>
          <button type="submit" class="btn btnPilihMobil fw-bold bg--limegreen-04 font--white font--size-14">Pilih Mobil</button>
        </div>
      </div>
    `;

    carGrid.appendChild(carElement);
  });

  carListContainer.appendChild(carGrid);

  setEqualCardHeight();
}

});
