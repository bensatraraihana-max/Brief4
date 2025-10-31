
// 1. DONNÉES DES MISSIONS (Simuler un JSON)
let missions = [
 {
    id: 1,
    name: "Apollo 11",
    agency: "NASA",
    objective: "Premier alunissage habité",
    launchDate: "1969-07-16",
    image: "images/apollo11.jpg"
  },
  {
    id: 2,
    name: "Voyager 1",
    agency: "NASA",
    objective: "Exploration du système solaire externe",
    launchDate: "1977-09-05",
    image: "images/voyager1.jpg"
  },
  {
    id: 3,
    name: "Rosetta",
    agency: "ESA",
    objective: "Étude de la comète 67P/Churyumov-Gerasimenko",
    launchDate: "2004-03-02",
    image: "images/rosetta.jpg"
  },
  {
    id: 4,
    name: "Curiosity",
    agency: "NASA",
    objective: "Exploration du cratère Gale sur Mars",
    launchDate: "2011-11-26",
    image: "images/curiosity.jpg"
  },
  {
    id: 5,
    name: "Artemis I",
    agency: "NASA",
    objective: "Test du système de lancement SLS et d’Orion",
    launchDate: "2022-11-16",
    image: "images/artemis1.jpg"
  },
  {
    id: 6,
    name: "James Webb Space Telescope",
    agency: "NASA/ESA/CSA",
    objective: "Observation de l’univers primitif",
    launchDate: "2021-12-25",
    image: "images/jwst.jpg"
  },
  {
    id: 7,
    name: "BepiColombo",
    agency: "ESA/JAXA",
    objective: "Exploration de la planète Mercure",
    launchDate: "2018-10-20",
    image: "images/bepicolombo.jpg"
  }
];
let favoris = [];

// ==========================================
// 2. VALIDATION DU FORMULAIRE DE CONTACT
// ==========================================
function validerFormulaireContact() {
  // Récupérer le formulaire
  const formulaire = document.querySelector('.contact-main-form');
  
  if (!formulaire) return; // Si pas de formulaire, sortir
  
  // Écouter la soumission du formulaire
  formulaire.addEventListener('submit', function(e) {
    e.preventDefault(); // Empêcher l'envoi par défaut
    
    // Récupérer les valeurs des champs
    const prenom = document.getElementById('firstName').value.trim();
    const nom = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const telephone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Variable pour vérifier si tout est valide
    let formulaireValide = true;
    
    // Supprimer les anciens messages d'erreur
    supprimerMessagesErreur();
    
    // Validation du prénom
    if (prenom === '') {
      afficherErreur('firstName', 'Le prénom est obligatoire');
      formulaireValide = false;
    }
    
    // Validation du nom
    if (nom === '') {
      afficherErreur('lastName', 'Le nom est obligatoire');
      formulaireValide = false;
    }
    
    // Validation de l'email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      afficherErreur('email', 'L\'email est obligatoire');
      formulaireValide = false;
    } else if (!regexEmail.test(email)) {
      afficherErreur('email', 'L\'email n\'est pas valide');
      formulaireValide = false;
    }
    
    // Validation du téléphone (optionnel mais format si rempli)
    if (telephone !== '') {
      const regexTel = /^[0-9]{10}$/;
      if (!regexTel.test(telephone.replace(/\s/g, ''))) {
        afficherErreur('phone', 'Le téléphone doit contenir 10 chiffres');
        formulaireValide = false;
      }
    }
    
    // Validation du message
    if (message === '') {
      afficherErreur('message', 'Le message est obligatoire');
      formulaireValide = false;
    }
    
    // Si tout est valide, afficher un message de succès
    if (formulaireValide) {
      alert('Message envoyé avec succès! ✅');
      formulaire.reset(); // Réinitialiser le formulaire
      // Rediriger vers la page de confirmation
      window.location.href = 'message.html';
    }
  });
}

// Fonction pour afficher un message d'erreur
function afficherErreur(champId, messageErreur) {
  const champ = document.getElementById(champId);
  const messageErreurElement = document.createElement('span');
  messageErreurElement.className = 'message-erreur';
  messageErreurElement.style.color = 'red';
  messageErreurElement.style.fontSize = '12px';
  messageErreurElement.style.display = 'block';
  messageErreurElement.style.marginTop = '5px';
  messageErreurElement.textContent = messageErreur;
  
  // Changer la bordure du champ en rouge
  champ.style.borderBottomColor = 'red';
  
  // Ajouter le message après le champ
  champ.parentElement.appendChild(messageErreurElement);
}

// Fonction pour supprimer tous les messages d'erreur
function supprimerMessagesErreur() {
  const messagesErreur = document.querySelectorAll('.message-erreur');
  messagesErreur.forEach(function(message) {
    message.remove();
  });
  
  // Réinitialiser les bordures
  const champs = document.querySelectorAll('.contact-field-group input');
  champs.forEach(function(champ) {
    champ.style.borderBottomColor = '#ddd';
  });
}

// ==========================================
// 3. RECHERCHE ET FILTRAGE DES MISSIONS
// ==========================================
function initialiserRecherche() {
  // Vérifier si on est sur la page missions
  const conteneurMissions = document.querySelector('.mission');
  if (!conteneurMissions) return;
  
  // Créer une barre de recherche
  creerBarreRecherche();
  
  // Créer des filtres
  creerFiltres();
}

function creerBarreRecherche() {
  // Créer un conteneur pour la recherche
  const conteneurRecherche = document.createElement('div');
  conteneurRecherche.style.maxWidth = '1200px';
  conteneurRecherche.style.margin = '30px auto';
  conteneurRecherche.style.padding = '0 20px';
  
  // Créer l'input de recherche
  const inputRecherche = document.createElement('input');
  inputRecherche.type = 'text';
  inputRecherche.id = 'recherche-missions';
  inputRecherche.placeholder = 'Rechercher une mission (nom, agence, objectif...)';
  inputRecherche.style.width = '100%';
  inputRecherche.style.padding = '15px';
  inputRecherche.style.fontSize = '16px';
  inputRecherche.style.border = '2px solid #ddd';
  inputRecherche.style.borderRadius = '8px';
  inputRecherche.style.marginBottom = '20px';
  
  // Ajouter l'événement de recherche
  inputRecherche.addEventListener('input', function(e) {
    const termeRecherche = e.target.value.toLowerCase();
    filtrerMissions(termeRecherche);
  });
  
  conteneurRecherche.appendChild(inputRecherche);
  
  // Insérer avant la première mission
  const premiereMission = document.querySelector('.mission');
  if (premiereMission) {
    premiereMission.parentElement.insertBefore(conteneurRecherche, premiereMission);
  }
}

function creerFiltres() {
  const conteneurFiltres = document.createElement('div');
  conteneurFiltres.style.maxWidth = '1200px';
  conteneurFiltres.style.margin = '0 auto 30px';
  conteneurFiltres.style.padding = '0 20px';
  conteneurFiltres.style.display = 'flex';
  conteneurFiltres.style.gap = '15px';
  conteneurFiltres.style.flexWrap = 'wrap';
  
  // Filtre par agence
  const selectAgence = document.createElement('select');
  selectAgence.id = 'filtre-agence';
  selectAgence.style.padding = '10px';
  selectAgence.style.fontSize = '14px';
  selectAgence.style.borderRadius = '5px';
  selectAgence.innerHTML = `
    <option value="">Toutes les agences</option>
    <option value="NASA">NASA</option>
    <option value="ESA">ESA</option>
    <option value="ISRO">ISRO</option>
  `;
  
  // Bouton "Afficher tout"
  const boutonReset = document.createElement('button');
  boutonReset.textContent = 'Réinitialiser les filtres';
  boutonReset.style.padding = '10px 20px';
  boutonReset.style.backgroundColor = '#000';
  boutonReset.style.color = '#fff';
  boutonReset.style.border = 'none';
  boutonReset.style.borderRadius = '5px';
  boutonReset.style.cursor = 'pointer';
  
  boutonReset.addEventListener('click', function() {
    document.getElementById('recherche-missions').value = '';
    selectAgence.value = '';
    filtrerMissions('');
  });
  
  selectAgence.addEventListener('change', function() {
    const termeRecherche = document.getElementById('recherche-missions').value.toLowerCase();
    filtrerMissions(termeRecherche);
  });
  
  conteneurFiltres.appendChild(selectAgence);
  conteneurFiltres.appendChild(boutonReset);
  
  const premiereMission = document.querySelector('.mission');
  if (premiereMission) {
    premiereMission.parentElement.insertBefore(conteneurFiltres, premiereMission);
  }
}

function filtrerMissions(termeRecherche) {
  const agenceSelectionnee = document.getElementById('filtre-agence')?.value || '';
  const toutesLesMissions = document.querySelectorAll('.mission');
  
  toutesLesMissions.forEach(function(mission) {
    const titre = mission.querySelector('h2')?.textContent.toLowerCase() || '';
    const texte = mission.querySelector('.mission-text p')?.textContent.toLowerCase() || '';
    
    // Vérifier la recherche
    const correspondRecherche = titre.includes(termeRecherche) || texte.includes(termeRecherche);
    
    // Vérifier le filtre agence (à implémenter avec des data attributes dans le HTML)
    const correspondAgence = agenceSelectionnee === '' || texte.includes(agenceSelectionnee.toLowerCase());
    
    // Afficher ou cacher
    if (correspondRecherche && correspondAgence) {
      mission.style.display = 'block';
    } else {
      mission.style.display = 'none';
    }
  });
}

// ==========================================
// 4. GESTION DES FAVORIS
// ==========================================
function initialiserFavoris() {
  // Charger les favoris depuis localStorage
  chargerFavoris();
  
  // Ajouter des boutons favoris sur chaque mission
  ajouterBoutonsFavoris();
  
  // Créer une section favoris
  creerSectionFavoris();
}

function chargerFavoris() {
  // Note: localStorage n'est pas disponible, on utilise juste un tableau
  favoris = [];
}

function ajouterBoutonsFavoris() {
  const toutesLesMissions = document.querySelectorAll('.mission-card');
  
  toutesLesMissions.forEach(function(missionCard, index) {
    const boutonFavori = document.createElement('button');
    boutonFavori.className = 'bouton-favori';
    boutonFavori.textContent = 'Ajouter aux favoris';
    boutonFavori.style.padding = '10px 20px';
    boutonFavori.style.backgroundColor = '#fff';
    boutonFavori.style.color = '#000';
    boutonFavori.style.border = '2px solid #000';
    boutonFavori.style.borderRadius = '5px';
    boutonFavori.style.cursor = 'pointer';
    boutonFavori.style.marginTop = '15px';
    boutonFavori.dataset.missionId = index;
    
    // Événement clic
    boutonFavori.addEventListener('click', function() {
      toggleFavori(index, boutonFavori);
    });
    
    // Vérifier si déjà en favori
    if (favoris.includes(index)) {
      boutonFavori.textContent = '⭐ Retirer des favoris';
      boutonFavori.style.backgroundColor = '#000';
      boutonFavori.style.color = '#fff';
    }
    
    missionCard.appendChild(boutonFavori);
  });
}

function toggleFavori(missionId, bouton) {
  const indexFavori = favoris.indexOf(missionId);
  
  if (indexFavori === -1) {
    // Ajouter aux favoris
    favoris.push(missionId);
    bouton.textContent = '⭐ Retirer des favoris';
    bouton.style.backgroundColor = '#000';
    bouton.style.color = '#fff';
    alert('Mission ajoutée aux favoris! ⭐');
  } else {
    // Retirer des favoris
    favoris.splice(indexFavori, 1);
    bouton.textContent = '⭐ Ajouter aux favoris';
    bouton.style.backgroundColor = '#fff';
    bouton.style.color = '#000';
    alert('Mission retirée des favoris');
  }
  
  // Mettre à jour la section favoris
  afficherFavoris();
}

function creerSectionFavoris() {
  const conteneurFavoris = document.createElement('div');
  conteneurFavoris.id = 'section-favoris';
  conteneurFavoris.style.maxWidth = '1200px';
  conteneurFavoris.style.margin = '50px auto';
  conteneurFavoris.style.padding = '20px';
  conteneurFavoris.style.backgroundColor = '#f5f5f5';
  conteneurFavoris.style.borderRadius = '10px';
  
  const titre = document.createElement('h2');
  titre.textContent = '⭐ Mes Missions Favorites';
  titre.style.marginBottom = '20px';
  titre.style.color = '#000';
  
  const listeFavoris = document.createElement('div');
  listeFavoris.id = 'liste-favoris';
  
  conteneurFavoris.appendChild(titre);
  conteneurFavoris.appendChild(listeFavoris);
  
  // Insérer avant le footer
  const footer = document.querySelector('.footer');
  if (footer) {
    footer.parentElement.insertBefore(conteneurFavoris, footer);
  }
}

function afficherFavoris() {
  const listeFavoris = document.getElementById('liste-favoris');
  if (!listeFavoris) return;
  
  listeFavoris.innerHTML = '';
  
  if (favoris.length === 0) {
    listeFavoris.innerHTML = '<p style="color: #666;">Aucune mission favorite pour le moment</p>';
    return;
  }
  
  const toutesLesMissions = document.querySelectorAll('.mission');
  favoris.forEach(function(missionId) {
    if (toutesLesMissions[missionId]) {
      const missionClone = toutesLesMissions[missionId].cloneNode(true);
      listeFavoris.appendChild(missionClone);
    }
  });
}

// ==========================================
// 5. GESTION CRUD DES MISSIONS
// ==========================================
function initialiserCRUD() {
  // Créer un bouton pour ajouter une nouvelle mission
  creerBoutonAjouterMission();
}

function creerBoutonAjouterMission() {
  const conteneurBouton = document.createElement('div');
  conteneurBouton.style.maxWidth = '1200px';
  conteneurBouton.style.margin = '30px auto';
  conteneurBouton.style.padding = '0 20px';
  conteneurBouton.style.textAlign = 'center';
  
  const bouton = document.createElement('button');
  bouton.textContent = '➕ Ajouter une nouvelle mission';
  bouton.style.padding = '15px 30px';
  bouton.style.backgroundColor = '#000';
  bouton.style.color = '#fff';
  bouton.style.border = 'none';
  bouton.style.borderRadius = '8px';
  bouton.style.fontSize = '16px';
  bouton.style.cursor = 'pointer';
  bouton.style.fontWeight = 'bold';
  
  bouton.addEventListener('click', function() {
    afficherFormulaireAjout();
  });
  
  conteneurBouton.appendChild(bouton);
  
  const premiereMission = document.querySelector('.mission');
  if (premiereMission) {
    premiereMission.parentElement.insertBefore(conteneurBouton, premiereMission);
  }
}

function afficherFormulaireAjout() {
  // Créer une modal
  const modal = document.createElement('div');
  modal.id = 'modal-ajout';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = '1000';
  
  const contenuModal = document.createElement('div');
  contenuModal.style.backgroundColor = '#fff';
  contenuModal.style.padding = '30px';
  contenuModal.style.borderRadius = '10px';
  contenuModal.style.maxWidth = '600px';
  contenuModal.style.width = '90%';
  contenuModal.style.maxHeight = '80vh';
  contenuModal.style.overflowY = 'auto';
  
  contenuModal.innerHTML = `
    <h2 style="color: #000; margin-bottom: 20px;">Ajouter une nouvelle mission</h2>
    <form id="form-ajout-mission">
      <div style="margin-bottom: 15px;">
        <label style="display: block; color: #000; margin-bottom: 5px;">Nom de la mission *</label>
        <input type="text" id="mission-nom" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; color: #000; margin-bottom: 5px;">Agence *</label>
        <input type="text" id="mission-agence" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; color: #000; margin-bottom: 5px;">Date de lancement *</label>
        <input type="date" id="mission-date" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; color: #000; margin-bottom: 5px;">Objectif *</label>
        <input type="text" id="mission-objectif" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
      </div>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; color: #000; margin-bottom: 5px;">Description *</label>
        <textarea id="mission-description" required rows="4" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;"></textarea>
      </div>
      
      <div style="display: flex; gap: 10px;">
        <button type="submit" style="flex: 1; padding: 12px; background-color: #000; color: #fff; border: none; border-radius: 5px; cursor: pointer;">Ajouter</button>
        <button type="button" id="btn-annuler" style="flex: 1; padding: 12px; background-color: #ccc; color: #000; border: none; border-radius: 5px; cursor: pointer;">Annuler</button>
      </div>
    </form>
  `;
  
  modal.appendChild(contenuModal);
  document.body.appendChild(modal);
  
  // Événement fermeture
  document.getElementById('btn-annuler').addEventListener('click', function() {
    modal.remove();
  });
  
  // Événement soumission
  document.getElementById('form-ajout-mission').addEventListener('submit', function(e) {
    e.preventDefault();
    ajouterNouvelleMission();
    modal.remove();
  });
}

function ajouterNouvelleMission() {
  const nom = document.getElementById('mission-nom').value;
  const agence = document.getElementById('mission-agence').value;
  const date = document.getElementById('mission-date').value;
  const objectif = document.getElementById('mission-objectif').value;
  const description = document.getElementById('mission-description').value;
  
  // Créer la nouvelle mission
  const nouvelleMission = {
    id: missions.length + 1,
    nom: nom,
    agence: agence,
    date: date,
    objectif: objectif,
    description: description,
    image: 'images/default.png'
  };
  
  missions.push(nouvelleMission);
  
  // Créer l'élément HTML
  creerElementMission(nouvelleMission);
  
  alert('Mission ajoutée avec succès! ✅');
}

function creerElementMission(mission) {
  const section = document.createElement('section');
  section.className = 'mission';
  
  section.innerHTML = `
    <div class="mission-header">
      <span class="dot"></span>
      <h2>${mission.nom}</h2>
    </div>
    <div class="mission-card">
      <div class="mission-text">
        <p>${mission.description}</p>
        <div style="margin-top: 15px; display: flex; gap: 10px;">
          <button class="btn-modifier" style="padding: 8px 15px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">✏️ Modifier</button>
          <button class="btn-supprimer" style="padding: 8px 15px; background-color: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;">🗑️ Supprimer</button>
        </div>
      </div>
      <div class="mission-image">
        <img src="${mission.image}" alt="${mission.nom}">
      </div>
    </div>
  `;
  
  // Ajouter les événements
  const btnModifier = section.querySelector('.btn-modifier');
  const btnSupprimer = section.querySelector('.btn-supprimer');
  
  btnModifier.addEventListener('click', function() {
    alert('Fonction de modification à implémenter');
  });
  
  btnSupprimer.addEventListener('click', function() {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette mission?')) {
      section.remove();
      alert('Mission supprimée!');
    }
  });
  
  // Insérer avant le footer
  const footer = document.querySelector('.footer');
  if (footer) {
    footer.parentElement.insertBefore(section, footer);
  }
}

// ==========================================
// 6. INITIALISATION AU CHARGEMENT DE LA PAGE
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  // Valider le formulaire de contact
  validerFormulaireContact();
  
  // Initialiser la recherche et les filtres
  initialiserRecherche();
  
  // Initialiser les favoris
  initialiserFavoris();
  
  // Initialiser le CRUD
  initialiserCRUD();
  
  // Bouton "Done" sur message.html
  const boutonDone = document.querySelector('.bouton-fermer');
  if (boutonDone) {
    boutonDone.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  }
  
  console.log('✅ JavaScript Space Odyssey chargé avec succès!');
});