document.addEventListener('DOMContentLoaded', () => {
    const gpsIcons = document.querySelectorAll('.gps-icon');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalRating = document.getElementById('modal-rating');
    const modalComments = document.getElementById('modal-comments');
    const modalAccessibility = document.getElementById('modal-accessibility');
    const closeModal = document.getElementById('close-modal');
    const filterModal = document.getElementById('filter-modal');
    const filterModalContent = document.getElementById('filter-modal-content');
    const closeFilterModal = document.getElementById('close-filter-modal');
    const filterButton = document.querySelector('.filter-button');
    let currentCategory = 'outros';
    let currentDisability = 'todos';

    const personIcon = Array.from(document.querySelectorAll('.filter-item .material-icons'))
        .find(icon => icon.textContent.trim() === 'person');
    if (personIcon) {
        personIcon.parentElement.addEventListener('click', () => {
            document.getElementById('disability-modal').classList.remove('hidden');
        });
    }

    document.getElementById('close-disability-modal').onclick = function() {
        document.getElementById('disability-modal').classList.add('hidden');
    };

    document.querySelectorAll('.disability-option').forEach(btn => {
        btn.addEventListener('click', function() {
            currentDisability = this.getAttribute('data-disability');
            filterPins();
            document.getElementById('disability-modal').classList.add('hidden');
        });
    });

    filterButton.addEventListener('click', () => {
        filterModal.classList.remove('hidden');
    });

    closeFilterModal.addEventListener('click', () => {
        filterModal.classList.add('hidden');
    });

    filterModal.addEventListener('click', (e) => {
        if (e.target === filterModal) {
            filterModal.classList.add('hidden');
        }
    });

    gpsIcons.forEach(icon => {
        icon.addEventListener('click', pinClickHandler);
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    document.querySelectorAll('.filter-option').forEach(btn => {
        btn.addEventListener('click', function() {
            currentCategory = this.getAttribute('data-category');
            filterPins();
            document.getElementById('filter-modal').classList.add('hidden');
        });
    });

    function filterPins() {
        document.querySelectorAll('.gps-icon').forEach(pin => {
            const pinCategory = pin.getAttribute('data-category');
            const pinAccessibility = pin.getAttribute('data-accessibility') || '';
            const matchCategory = (currentCategory === 'outros') || (pinCategory === currentCategory);
            const matchDisability = (currentDisability === 'todos') || (pinAccessibility.includes(currentDisability));
            pin.style.display = (matchCategory && matchDisability) ? 'block' : 'none';
        });
    }

    const favoriteBtn = document.getElementById('favorite-btn');
    const favoriteIcon = document.getElementById('favorite-icon');
    const favoritesModal = document.getElementById('favorites-modal');
    const closeFavoritesModal = document.getElementById('close-favorites-modal');
    const favoritesList = document.getElementById('favorites-list');
    let favorites = [];

    favoriteBtn.addEventListener('click', () => {
        const localName = document.getElementById('modal-title').textContent;
        if (favorites.includes(localName)) {
            favorites = favorites.filter(fav => fav !== localName);
            favoriteIcon.textContent = 'outlined_flag';
        } else {
            favorites.push(localName);
            favoriteIcon.textContent = 'flag';
        }
    });

    const bookmarkIcon = Array.from(document.querySelectorAll('.filter-item .material-icons'))
        .find(icon => icon.textContent.trim() === 'bookmark');
    if (bookmarkIcon) {
        bookmarkIcon.parentElement.addEventListener('click', () => {
            favoritesList.innerHTML = '';
            if (favorites.length === 0) {
                const li = document.createElement('li');
                li.innerHTML = "<b>Aqui estão seus locais favoritos, comece a testar!</b>";
                li.style.textAlign = "center";
                li.style.padding = "16px";
                favoritesList.appendChild(li);
            } else {
                favorites.forEach(favInfo => {
                    const gpsIcon = Array.from(document.querySelectorAll('.gps-icon'))
                        .find(icon => icon.getAttribute('data-info') === favInfo);
                    if (gpsIcon) {
                        const li = document.createElement('li');
                        li.style.position = "relative";
                        li.style.display = "flex";
                        li.style.alignItems = "center";
                        li.style.justifyContent = "space-between";
                        const nameSpan = document.createElement('span');
                        nameSpan.textContent = favInfo;
                        nameSpan.style.flex = "1";
                        nameSpan.style.cursor = "pointer";
                        nameSpan.addEventListener('click', () => {
                            gpsIcon.click();
                            favoritesModal.classList.add('hidden');
                        });
                        const removeBtn = document.createElement('button');
                        removeBtn.innerHTML = '&times;';
                        removeBtn.title = 'Remover dos favoritos';
                        removeBtn.style.background = "none";
                        removeBtn.style.border = "none";
                        removeBtn.style.color = "#111";
                        removeBtn.style.fontSize = "1.1em";
                        removeBtn.style.cursor = "pointer";
                        removeBtn.style.marginLeft = "8px";
                        removeBtn.style.padding = "2px 6px";
                        removeBtn.style.borderRadius = "50%";
                        removeBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            favorites = favorites.filter(fav => fav !== favInfo);
                            li.remove();
                            if (favorites.length === 0) {
                                favoritesList.innerHTML = '';
                                const emptyLi = document.createElement('li');
                                emptyLi.innerHTML = "<b>Aqui estão seus locais favoritos, comece a testar!</b>";
                                emptyLi.style.textAlign = "center";
                                emptyLi.style.padding = "16px";
                                favoritesList.appendChild(emptyLi);
                            }
                        });
                        li.appendChild(nameSpan);
                        li.appendChild(removeBtn);
                        favoritesList.appendChild(li);
                    }
                });
            }
            favoritesModal.classList.remove('hidden');
        });
    }

    closeFavoritesModal.addEventListener('click', () => {
        favoritesModal.classList.add('hidden');
    });

    const expandIcon = Array.from(document.querySelectorAll('.filter-item .material-icons'))
        .find(icon => icon.textContent.trim() === 'expand_more');
    if (expandIcon) {
        expandIcon.parentElement.addEventListener('click', () => {
            document.getElementById('create-location-modal').classList.remove('hidden');
        });
    }

    document.getElementById('close-create-location-modal').onclick = function() {
        document.getElementById('create-location-modal').classList.add('hidden');
    };

    function showErrorModal(message) {
        const errorModal = document.getElementById('error-modal');
        const errorMsg = document.getElementById('error-modal-message');
        errorMsg.textContent = message;
        errorModal.classList.remove('hidden');
    }

    document.getElementById('close-error-modal').onclick = function() {
        document.getElementById('error-modal').classList.add('hidden');
    };

    document.getElementById('error-modal').addEventListener('click', function(e) {
        if (e.target === this) this.classList.add('hidden');
    });

    let canCreateLocation = true;

    document.getElementById('select-location-btn').addEventListener('click', function() {
        const mapsLink = document.getElementById('new-location-maps-link').value.trim();
        const exists = Array.from(document.querySelectorAll('.gps-icon'))
            .some(div => (div.getAttribute('data-maps-link') || '').trim() === mapsLink);
        if (exists) {
            showErrorModal('Este ambiente já está incluído no mapa!');
            pendingLocationData = null;
            return;
        }
        pendingLocationData = {
            name: document.getElementById('new-location-name').value,
            image: document.getElementById('new-location-image').value || 'Assets/local1.jpg',
            category: document.getElementById('new-location-category').value,
            rating: document.getElementById('new-location-rating').value,
            comments: document.getElementById('new-location-comments').value,
            accessibility: Array.from(document.querySelectorAll('input[name="new-location-accessibility"]:checked'))
                .map(cb => cb.value)
                .join(', '),
            mapsLink: mapsLink
        };
        document.getElementById('create-location-modal').classList.add('hidden');
        document.body.style.cursor = 'crosshair';
    });

    document.getElementById('map-container').addEventListener('click', function(e) {
        if (!pendingLocationData) return;
        const exists = Array.from(document.querySelectorAll('.gps-icon'))
            .some(div => (div.getAttribute('data-maps-link') || '').trim() === pendingLocationData.mapsLink);
        if (exists) {
            showErrorModal('Este ambiente já está incluído no mapa!');
            pendingLocationData = null;
            document.body.style.cursor = '';
            return;
        }
        const mapImg = document.getElementById('map');
        const mapRect = mapImg.getBoundingClientRect();
        const x = ((e.clientX - mapRect.left) / mapRect.width) * 100;
        const y = ((e.clientY - mapRect.top) / mapRect.height) * 100;
        const div = document.createElement('div');
        div.className = 'gps-icon';
        div.setAttribute('data-category', pendingLocationData.category);
        div.setAttribute('data-info', pendingLocationData.name);
        div.setAttribute('data-image', pendingLocationData.image);
        div.setAttribute('data-rating', pendingLocationData.rating);
        div.setAttribute('data-comments', pendingLocationData.comments);
        div.setAttribute('data-accessibility', pendingLocationData.accessibility);
        div.setAttribute('data-maps-link', pendingLocationData.mapsLink);
        div.style.position = 'absolute';
        div.style.top = y + '%';
        div.style.left = x + '%';
        div.innerHTML = '<span class="material-icons">location_on</span>';
        div.addEventListener('click', pinClickHandler);
        this.appendChild(div);
        pendingLocationData = null;
        document.body.style.cursor = '';
        createLocationForm.reset();
        selectLocationBtn.disabled = true;
    });

    const createLocationForm = document.getElementById('create-location-form');
    const selectLocationBtn = document.getElementById('select-location-btn');
    const formFields = [
        'new-location-name',
        'new-location-category',
        'new-location-rating',
        'new-location-maps-link'
    ];

    createLocationForm.addEventListener('input', () => {
        const filled = formFields.every(id => document.getElementById(id).value.trim() !== '');
        const atLeastOneAccessibility = document.querySelectorAll('input[name="new-location-accessibility"]:checked').length > 0;
        selectLocationBtn.disabled = !(filled && atLeastOneAccessibility);
    });

    const openMapsBtn = document.getElementById('open-maps-btn');

    function pinClickHandler() {
        const localName = this.getAttribute('data-info');
        document.getElementById('modal-title').textContent = localName;
        document.getElementById('modal-image').src = this.getAttribute('data-image');
        const rating = parseInt(this.getAttribute('data-rating'), 10) || 0;
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating
                ? '<span style="color: #FFD700; font-size: 1.5em;">&#9733;</span>'
                : '<span style="color: #ccc; font-size: 1.5em;">&#9733;</span>';
        }
        document.getElementById('modal-rating').innerHTML = stars;
        document.getElementById('modal-comments').textContent = this.getAttribute('data-comments');
        document.getElementById('modal-accessibility').textContent = 'Acessibilidade: ' + this.getAttribute('data-accessibility');
        if (favorites.includes(localName)) {
            favoriteIcon.textContent = 'flag';
        } else {
            favoriteIcon.textContent = 'outlined_flag';
        }
        openMapsBtn.onclick = () => {
            const mapsLink = this.getAttribute('data-maps-link');
            if (mapsLink) {
                window.open(mapsLink, '_blank');
            } else {
                alert('Link do Google Maps não disponível para este local.');
            }
        };
        modal.classList.remove('hidden');
    }
});