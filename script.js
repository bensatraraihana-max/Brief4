// ==========================================
// DONNÉES DES MISSIONS
// ==========================================
let missions = [
  {
    id: 1,
    name: "Apollo 11",
    agency: "NASA",
    objective: "Premier alunissage habité",
    launchDate: "1969-07-16",
    description:
      "The Apollo 11 mission, led by NASA, made history by allowing humankind to walk on the Moon for the very first time. Launched on July 16, 1969, it marked the beginning of a new era in space exploration and human achievement.",
    image: "images/1.png",
  },
  {
    id: 2,
    name: "Curiosity Rover",
    agency: "NASA",
    objective: "Exploration du cratère Gale sur Mars",
    launchDate: "2011-11-26",
    description:
      "The Curiosity Rover, operated by NASA, was designed to explore the Martian surface, study its geology and climate, and search for signs of past life. It was launched on November 26, 2011, and continues to send valuable scientific data from the Red Planet.",
    image: "images/2.png",
  },
  {
    id: 3,
    name: "James Webb Space Telescope",
    agency: "NASA/ESA/CSA",
    objective: "Observation de l'univers primitif",
    launchDate: "2021-12-25",
    description:
      "A collaboration between NASA, ESA, and CSA, the James Webb Space Telescope was launched on December 25, 2021. Its goal is to observe distant galaxies, study the formation of stars and planets, and uncover the origins of our universe.",
    image: "images/3.png",
  },
  {
    id: 4,
    name: "Artemis I",
    agency: "NASA",
    objective: "Test du système de lancement SLS et d'Orion",
    launchDate: "2022-11-16",
    description:
      "The Artemis I mission, developed by NASA, aimed to test the SLS rocket and the Orion spacecraft around the Moon. Launched on November 16, 2022, it represents a key step toward the return of humans to the lunar surface.",
    image: "images/4.png",
  },
  {
    id: 5,
    name: "Hubble Space Telescope",
    agency: "NASA/ESA",
    objective: "Observation de l'univers",
    launchDate: "1990-04-24",
    description:
      "Launched on April 24, 1990, the Hubble Space Telescope — a joint project between NASA and ESA — has captured breathtaking images of our universe. For more than three decades, it has revealed distant galaxies, nebulae, and the vast beauty of outer space.",
    image: "images/5.png",
  },
  {
    id: 6,
    name: "Voyager 1",
    agency: "NASA",
    objective: "Exploration du système solaire externe",
    launchDate: "1977-09-05",
    description:
      "Launched by NASA on September 5, 1977, Voyager 1 explored Jupiter and Saturn before continuing its journey into interstellar space. It remains the most distant human-made object, still transmitting valuable data to Earth.",
    image: "images/6.png",
  },
  {
    id: 7,
    name: "Sputnik 1",
    agency: "Soviet Union",
    objective: "Premier satellite artificiel",
    launchDate: "1957-10-04",
    description:
      "On October 4, 1957, the Soviet Union launched Sputnik 1, the first artificial satellite ever placed in orbit around Earth. This historic event marked the dawn of the space age and sparked the space race between world powers.",
    image: "images/7.png",
  },
  {
    id: 8,
    name: "International Space Station",
    agency: "NASA/Roscosmos/ESA/JAXA/CSA",
    objective: "Station spatiale habitée",
    launchDate: "1998-11-20",
    description:
      "A collaboration between NASA, Roscosmos, ESA, JAXA, and CSA, the International Space Station (ISS) was launched on November 20, 1998. It serves as an orbiting laboratory where astronauts conduct experiments and research in a unique microgravity environment.",
    image: "images/8.png",
  },
  {
    id: 9,
    name: "Mars Express",
    agency: "ESA",
    objective: "Étude de Mars",
    launchDate: "2003-06-02",
    description:
      "Launched by the European Space Agency (ESA) on June 2, 2003, Mars Express was designed to study the Martian atmosphere and surface composition. It provided groundbreaking discoveries, including the detection of water ice beneath the surface.",
    image: "images/9.png",
  },
  {
    id: 10,
    name: "Chandrayaan-3",
    agency: "ISRO",
    objective: "Mission lunaire indienne",
    launchDate: "2023-07-14",
    description:
      "The Chandrayaan-3 mission by ISRO was designed to explore the lunar surface. It successfully landed on the Moon's south pole region, making India the fourth country to achieve a soft landing on the Moon.",
    image: "images/10.png",
  },
];

let favoris = [];
let ongletActuel = "toutes"; // 'toutes', 'favoris', 'mes-missions'

// ==========================================
// VALIDATION DU FORMULAIRE DE CONTACT
// ==========================================
function validerFormulaireContact() {
  const formulaire = document.querySelector(".contact-main-form");
  if (!formulaire) return;

  formulaire.addEventListener("submit", function (e) {
    e.preventDefault();

    const prenom = document.getElementById("firstName").value.trim();
    const nom = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    let formulaireValide = true;
    supprimerMessagesErreur();

    // Validation du prénom
    const regexNom = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
    if (prenom === "" || !regexNom.test(prenom)) {
      afficherErreur(
        "firstName",
        "Le prénom doit contenir au moins 2 caractères valides"
      );
      formulaireValide = false;
    }

    // Validation du nom
    if (nom === "" || !regexNom.test(nom)) {
      afficherErreur(
        "lastName",
        "Le nom doit contenir au moins 2 caractères valides"
      );
      formulaireValide = false;
    }

    // Validation de l'email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      afficherErreur("email", "L'email est obligatoire");
      formulaireValide = false;
    } else if (!regexEmail.test(email)) {
      afficherErreur(
        "email",
        "L'email n'est pas valide (ex: exemple@domaine.com)"
      );
      formulaireValide = false;
    }

    // Validation du téléphone
    if (telephone !== "") {
      const regexTel = /^[0-9]{10}$/;
      if (!regexTel.test(telephone.replace(/\s/g, ""))) {
        afficherErreur(
          "phone",
          "Le téléphone doit contenir exactement 10 chiffres"
        );
        formulaireValide = false;
      }
    }

    // Validation du message
    if (message === "") {
      afficherErreur("message", "Le message est obligatoire");
      formulaireValide = false;
    } else if (message.length < 10) {
      afficherErreur(
        "message",
        "Le message doit contenir au moins 10 caractères"
      );
      formulaireValide = false;
    }

    // Résultat
    if (formulaireValide) {
      // Sauvegarder les données (simulation)
      console.log("Formulaire valide:", {
        prenom,
        nom,
        email,
        telephone,
        message,
      });

      // Redirection vers la page de confirmation
      window.location.href = "message.html";
    } else {
      // Afficher une alerte générale
      const premiereErreur = document.querySelector(".message-erreur");
      if (premiereErreur) {
        premiereErreur.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });
}

function afficherErreur(champId, messageErreur) {
  const champ = document.getElementById(champId);
  if (!champ) return;

  // Supprimer ancien message
  const ancienMessage = champ.parentElement.querySelector(".message-erreur");
  if (ancienMessage) ancienMessage.remove();

  // Créer le message d'erreur
  const messageErreurElement = document.createElement("span");
  messageErreurElement.className = "message-erreur";
  messageErreurElement.style.color = "#ff4444";
  messageErreurElement.style.fontSize = "12px";
  messageErreurElement.style.display = "block";
  messageErreurElement.style.marginTop = "5px";
  messageErreurElement.style.fontWeight = "500";
  messageErreurElement.textContent = "⚠️ " + messageErreur;

  champ.insertAdjacentElement("afterend", messageErreurElement);
  champ.style.borderBottomColor = "#ff4444";
  champ.style.borderBottomWidth = "2px";
}

function supprimerMessagesErreur() {
  const messagesErreur = document.querySelectorAll(".message-erreur");
  messagesErreur.forEach((msg) => msg.remove());

  const champs = document.querySelectorAll(".contact-field-group input");
  champs.forEach((champ) => {
    champ.style.borderBottomColor = "#ddd";
    champ.style.borderBottomWidth = "2px";
  });
}

// ==========================================
// SYSTÈME DE MISSIONS - PAGE MISSIONS
// ==========================================
function initialiserPageMissions() {
  if (!document.querySelector(".mission")) return;

  chargerFavoris();
  creerInterfaceMissions();
  afficherMissionsFromData();
}

function creerInterfaceMissions() {
  const premiereMission = document.querySelector(".mission");
  if (!premiereMission) return;

  // Créer le conteneur principal
  const conteneurPrincipal = document.createElement("div");
  conteneurPrincipal.style.maxWidth = "1200px";
  conteneurPrincipal.style.margin = "30px auto";
  conteneurPrincipal.style.padding = "0 20px";

  // Barre de recherche
  const barreRecherche = document.createElement("input");
  barreRecherche.type = "text";
  barreRecherche.id = "recherche-missions";
  barreRecherche.placeholder =
    "Rechercher une mission (nom, agence, objectif, date...)";
  barreRecherche.style.cssText = `
    width: 100%;
    padding: 15px 20px;
    font-size: 16px;
    border: 2px solid #ddd;
    border-radius: 8px;
    margin-bottom: 20px;
    transition: border-color 0.3s;
  `;
  barreRecherche.addEventListener(
    "focus",
    () => (barreRecherche.style.borderColor = "#000")
  );
  barreRecherche.addEventListener(
    "blur",
    () => (barreRecherche.style.borderColor = "#ddd")
  );
  barreRecherche.addEventListener("input", filtrerMissions);

  // Conteneur des filtres et onglets
  const conteneurControls = document.createElement("div");
  conteneurControls.style.cssText = `
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    align-items: center;
  `;

  // Onglets
  const onglets = ["toutes", "favoris", "mes-missions"];
  const labelOnglets = {
    toutes: "Toutes les missions",
    favoris: " Favoris",
    "mes-missions": "Mes missions",
  };

  onglets.forEach((onglet) => {
    const bouton = document.createElement("button");
    bouton.textContent = labelOnglets[onglet];
    bouton.dataset.onglet = onglet;
    bouton.style.cssText = `
      padding: 10px 20px;
      border: 2px solid #000;
      background-color: ${onglet === "toutes" ? "#000" : "#fff"};
      color: ${onglet === "toutes" ? "#fff" : "#000"};
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
    `;
    bouton.addEventListener("click", () => changerOnglet(onglet));
    conteneurControls.appendChild(bouton);
  });

  // Filtre par agence
  const selectAgence = document.createElement("select");
  selectAgence.id = "filtre-agence";
  selectAgence.style.cssText = `
    padding: 10px 15px;
    font-size: 14px;
    border: 2px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
  `;
  selectAgence.innerHTML = `
    <option value="" style=" color: black">Toutes les agences</option>
    <option value="NASA" style=" color: black">NASA</option>
    <option value="ESA" style=" color: black">ESA</option>
    <option value="ISRO" style=" color: black">ISRO</option>
    <option value="Soviet Union " style=" color: black" >Soviet Union</option>
  `;
  selectAgence.addEventListener("change", filtrerMissions);

  // Bouton ajouter
  const boutonAjouter = document.createElement("button");
  boutonAjouter.textContent = "➕ Nouvelle mission";
  boutonAjouter.style.cssText = `
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    margin-left: auto;
  `;
  boutonAjouter.addEventListener("click", afficherFormulaireAjout);

  // Bouton reset
  const boutonReset = document.createElement("button");
  boutonReset.textContent = " Réinitialiser";
  boutonReset.style.cssText = `
    padding: 10px 20px;
    background-color: #666;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `;
  boutonReset.addEventListener("click", () => {
    barreRecherche.value = "";
    selectAgence.value = "";
    filtrerMissions();
  });

  conteneurControls.appendChild(selectAgence);
  conteneurControls.appendChild(boutonReset);
  conteneurControls.appendChild(boutonAjouter);

  // Conteneur des missions
  const conteneurMissions = document.createElement("div");
  conteneurMissions.id = "conteneur-missions";
  conteneurMissions.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 30px;
  `;

  conteneurPrincipal.appendChild(barreRecherche);
  conteneurPrincipal.appendChild(conteneurControls);
  conteneurPrincipal.appendChild(conteneurMissions);

  premiereMission.parentElement.insertBefore(
    conteneurPrincipal,
    premiereMission
  );

  // Cacher les missions statiques
  document
    .querySelectorAll(".mission")
    .forEach((m) => (m.style.display = "none"));
}

function afficherMissionsFromData() {
  const conteneur = document.getElementById("conteneur-missions");
  if (!conteneur) return;

  conteneur.innerHTML = "";

  let missionsAfficher = [];

  if (ongletActuel === "toutes") {
    missionsAfficher = missions;
  } else if (ongletActuel === "favoris") {
    missionsAfficher = missions.filter((m) => favoris.includes(m.id));
  } else if (ongletActuel === "mes-missions") {
    missionsAfficher = missions.filter((m) => m.id > 10); // Missions ajoutées
  }

  if (missionsAfficher.length === 0) {
    conteneur.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: #666;">
        <p style="font-size: 18px;">Aucune mission à afficher</p>
      </div>
    `;
    return;
  }

  missionsAfficher.forEach((mission) => {
    const missionElement = creerElementMission(mission);
    conteneur.appendChild(missionElement);
  });
}

function creerElementMission(mission) {
  const section = document.createElement("section");
  section.className = "mission-dynamique";
  section.dataset.missionId = mission.id;
  section.dataset.name = mission.name.toLowerCase();
  section.dataset.agency = mission.agency.toLowerCase();
  section.dataset.objective = mission.objective.toLowerCase();
  section.dataset.date = mission.launchDate;

  const estFavori = favoris.includes(mission.id);

  section.innerHTML = `
    <div class="mission-header">
      <span class="dot"></span>
      <h2>${mission.name}</h2>
    </div>
    <div class="mission-card">
      <div class="mission-text" ">
        <p><strong>Agence:</strong> ${mission.agency}</p>
        <p><strong>Objectif:</strong> ${mission.objective}</p>
        <p><strong>Date de lancement:</strong> ${new Date(
          mission.launchDate
        ).toLocaleDateString("fr-FR")}</p>
        <p style="margin-top: 15px;">${mission.description}</p>
        <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn-favori" data-id="${mission.id}" style="
            padding: 10px 20px;
            background-color: ${estFavori ? "#FFD700" : "#fff"};
            color: #000;
            border: 2px solid ${estFavori ? "#FFD700" : "#ddd"};
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
          ">
            ${estFavori ? "⭐ Retirer des favoris" : "☆ Ajouter aux favoris"}
          </button>
          ${
            mission.id > 10
              ? `
            <button class="btn-modifier" data-id="${mission.id}" style="
              padding: 10px 20px;
              background-color: #2196F3;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              font-weight: 600;
            ">Modifier</button>
            <button class="btn-supprimer" data-id="${mission.id}" style="
              padding: 10px 20px;
              background-color: #f44336;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              font-weight: 600;
            ">Supprimer</button>
          `
              : ""
          }
        </div>
      </div>
      <div class="mission-image">
        <img src="${mission.image}" alt="${
    mission.name
  }" onerror="this.src='images/default.png'">
      </div>
    </div>
  `;

  // Événements
  const btnFavori = section.querySelector(".btn-favori");
  btnFavori.addEventListener("click", () => toggleFavori(mission.id));

  const btnModifier = section.querySelector(".btn-modifier");
  if (btnModifier) {
    btnModifier.addEventListener("click", () =>
      afficherFormulaireModification(mission.id)
    );
  }

  const btnSupprimer = section.querySelector(".btn-supprimer");
  if (btnSupprimer) {
    btnSupprimer.addEventListener("click", () => supprimerMission(mission.id));
  }

  return section;
}

function toggleFavori(missionId) {
  const index = favoris.indexOf(missionId);

  if (index === -1) {
    favoris.push(missionId);
    afficherNotification("⭐ Mission ajoutée aux favoris!");
  } else {
    favoris.splice(index, 1);
    afficherNotification("Mission retirée des favoris");
  }

  sauvegarderFavoris();
  afficherMissionsFromData();
}

function changerOnglet(nouvelOnglet) {
  ongletActuel = nouvelOnglet;

  // Mettre à jour les styles des boutons
  document.querySelectorAll("[data-onglet]").forEach((btn) => {
    const estActif = btn.dataset.onglet === nouvelOnglet;
    btn.style.backgroundColor = estActif ? "#000" : "#fff";
    btn.style.color = estActif ? "#fff" : "#000";
  });

  afficherMissionsFromData();
}

function filtrerMissions() {
  const recherche =
    document.getElementById("recherche-missions")?.value.toLowerCase() || "";
  const agence =
    document.getElementById("filtre-agence")?.value.toLowerCase() || "";

  const missionsDynamiques = document.querySelectorAll(".mission-dynamique");

  missionsDynamiques.forEach((mission) => {
    const name = mission.dataset.name || "";
    const missionAgency = mission.dataset.agency || "";
    const objective = mission.dataset.objective || "";
    const date = mission.dataset.date || "";

    const correspondRecherche =
      !recherche ||
      name.includes(recherche) ||
      missionAgency.includes(recherche) ||
      objective.includes(recherche) ||
      date.includes(recherche);

    const correspondAgence = !agence || missionAgency.includes(agence);

    mission.style.display =
      correspondRecherche && correspondAgence ? "block" : "none";
  });
}

// ==========================================
// CRUD - AJOUT ET MODIFICATION
// ==========================================
function afficherFormulaireAjout() {
  afficherFormulaireMission(null);
}

function afficherFormulaireModification(missionId) {
  const mission = missions.find((m) => m.id === missionId);
  if (!mission) return;
  afficherFormulaireMission(mission);
}

function afficherFormulaireMission(mission) {
  const modal = document.createElement("div");
  modal.id = "modal-mission";
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s;
  `;

  const contenu = document.createElement("div");
  contenu.style.cssText = `
    background-color: #fff;
    padding: 40px;
    border-radius: 15px;
    max-width: 600px;
    width: 90%;
    max-height: 85vh;
    overflow-y: auto;
    box-shadow: 0 10px 50px rgba(0,0,0,0.5);
  `;

  const titre = mission
    ? "Modifier la mission"
    : "Ajouter une nouvelle mission";

  contenu.innerHTML = `
    <h2 style="color: #000; margin-bottom: 25px; font-size: 24px;">${titre}</h2>
    <form id="form-mission">
      <div style="margin-bottom: 20px;">
        <label style="display: block; color: #000; margin-bottom: 8px; font-weight: 600;">Nom de la mission *</label>
        <input type="text" id="mission-nom" value="${
          mission?.name || ""
        }" required 
          style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px;">
      </div>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; color: #000; margin-bottom: 8px; font-weight: 600;">Agence *</label>
        <input type="text" id="mission-agence" value="${
          mission?.agency || ""
        }" required 
          style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px;">
      </div>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; color: #000; margin-bottom: 8px; font-weight: 600;">Date de lancement *</label>
        <input type="date" id="mission-date" value="${
          mission?.launchDate || ""
        }" required 
          style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px;">
      </div>
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; color: #000; margin-bottom: 8px; font-weight: 600;">Objectif *</label>
        <input type="text" id="mission-objectif" value="${
          mission?.objective || ""
        }" required 
          style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px;">
      </div>
      
      <div style="margin-bottom: 25px;">
        <label style="display: block; color: #000; margin-bottom: 8px; font-weight: 600;">Description *</label>
        <textarea id="mission-description" required rows="5" 
          style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px; resize: vertical;">${
            mission?.description || ""
          }</textarea>
      </div>
      
      <div style="display: flex; gap: 15px;">
        <button type="submit" style="
          flex: 1;
          padding: 14px;
          background-color: #4CAF50;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 15px;
        ">${mission ? "✓ Enregistrer" : "+ Ajouter"}</button>
        <button type="button" id="btn-annuler-mission" style="
          flex: 1;
          padding: 14px;
          background-color: #f44336;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 15px;
        ">✕ Annuler</button>
      </div>
    </form>
  `;

  modal.appendChild(contenu);
  document.body.appendChild(modal);

  document
    .getElementById("btn-annuler-mission")
    .addEventListener("click", () => modal.remove());

  document.getElementById("form-mission").addEventListener("submit", (e) => {
    e.preventDefault();

    const donnees = {
      name: document.getElementById("mission-nom").value.trim(),
      agency: document.getElementById("mission-agence").value.trim(),
      launchDate: document.getElementById("mission-date").value,
      objective: document.getElementById("mission-objectif").value.trim(),
      description: document.getElementById("mission-description").value.trim(),
    };

    if (mission) {
      modifierMission(mission.id, donnees);
    } else {
      ajouterMission(donnees);
    }

    modal.remove();
  });
}

function ajouterMission(donnees) {
  const nouvelleMission = {
    id: missions.length > 0 ? Math.max(...missions.map((m) => m.id)) + 1 : 1,
    ...donnees,
    image: "images/default.png",
  };

  missions.push(nouvelleMission);
  afficherNotification("✓ Mission ajoutée avec succès!");
  ongletActuel = "mes-missions";
  changerOnglet("mes-missions");
  afficherMissionsFromData();
}

function modifierMission(id, donnees) {
  const index = missions.findIndex((m) => m.id === id);
  if (index !== -1) {
    missions[index] = { ...missions[index], ...donnees };
    afficherNotification("✓ Mission modifiée avec succès!");
    afficherMissionsFromData();
  }
}

function supprimerMission(id) {
  if (
    !confirm(
      "Êtes-vous sûr de vouloir supprimer cette mission?\nCette action est irréversible."
    )
  ) {
    return;
  }

  const index = missions.findIndex((m) => m.id === id);
  if (index !== -1) {
    missions.splice(index, 1);

    // Retirer des favoris si nécessaire
    const favIndex = favoris.indexOf(id);
    if (favIndex !== -1) {
      favoris.splice(favIndex, 1);
      sauvegarderFavoris();
    }

    afficherNotification("✓ Mission supprimée");
    afficherMissionsFromData();
  }
}

// ==========================================
// GESTION DES FAVORIS (localStorage simulé)
// ==========================================
function chargerFavoris() {
  // Simulation localStorage avec variable globale
  favoris = [];
}

function sauvegarderFavoris() {
  // Simulation localStorage
  console.log("Favoris sauvegardés:", favoris);
}

// ==========================================
// NOTIFICATIONS
// ==========================================
function afficherNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #000;
    color: #fff;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    z-index: 10001;
    animation: slideIn 0.3s ease-out;
    font-weight: 500;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-in";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ==========================================
// INITIALISATION
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("Space Odyssey JavaScript chargé!");

  // Ajouter les styles d'animation
  ajouterStylesAnimations();

  // Validation formulaire de contact
  validerFormulaireContact();

  // Page missions
  initialiserPageMissions();

  // Bouton Done sur message.html
  const boutonDone = document.querySelector(".bouton-fermer");
  if (boutonDone) {
    boutonDone.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  // Améliorer la validation en temps réel
  ajouterValidationTempsReel();
});

// ==========================================
// VALIDATION EN TEMPS RÉEL
// ==========================================
function ajouterValidationTempsReel() {
  const champsValidation = {
    firstName: {
      regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/,
      message: "Le prénom doit contenir au moins 2 caractères valides",
    },
    lastName: {
      regex: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/,
      message: "Le nom doit contenir au moins 2 caractères valides",
    },
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Format: exemple@domaine.com",
    },
    phone: {
      regex: /^[0-9]{10}$/,
      message: "Le téléphone doit contenir 10 chiffres",
      optional: true,
    },
    message: {
      minLength: 10,
      message: "Le message doit contenir au moins 10 caractères",
    },
  };

  Object.keys(champsValidation).forEach((champId) => {
    const champ = document.getElementById(champId);
    if (!champ) return;

    champ.addEventListener("blur", function () {
      const valeur = this.value.trim();
      const config = champsValidation[champId];

      // Supprimer les anciens messages
      const ancienMessage = this.parentElement.querySelector(".message-erreur");
      if (ancienMessage) ancienMessage.remove();

      if (valeur === "" && !config.optional) {
        afficherErreur(champId, "Ce champ est obligatoire");
        return;
      }

      if (valeur !== "") {
        if (config.regex && !config.regex.test(valeur.replace(/\s/g, ""))) {
          afficherErreur(champId, config.message);
          return;
        }

        if (config.minLength && valeur.length < config.minLength) {
          afficherErreur(champId, config.message);
          return;
        }
      }

      // Champ valide
      this.style.borderBottomColor = "#4CAF50";
      this.style.borderBottomWidth = "2px";
    });

    champ.addEventListener("focus", function () {
      const ancienMessage = this.parentElement.querySelector(".message-erreur");
      if (ancienMessage) ancienMessage.remove();
      this.style.borderBottomColor = "#000";
    });
  });
}

// ==========================================
// STYLES ET ANIMATIONS
// ==========================================
function ajouterStylesAnimations() {
  if (document.getElementById("animations-css")) return;

  const style = document.createElement("style");
  style.id = "animations-css";
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
    
    .mission-dynamique {
      animation: fadeIn 0.5s ease-out;
    }
    
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    
    button:active {
      transform: translateY(0);
    }
    
    input:focus, textarea:focus, select:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
    }
    
    .message-erreur {
      animation: fadeIn 0.3s ease-out;
    }
  `;

  document.head.appendChild(style);
}

// ==========================================
// FONCTIONS UTILITAIRES
// ==========================================
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function sanitizeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Exporter pour utilisation globale si nécessaire
window.SpaceOdyssey = {
  missions,
  favoris,
  ajouterMission,
  modifierMission,
  supprimerMission,
  toggleFavori,
};
//pour header
function initialiserModaleFavoris() {
  const btnOuvrir = document.getElementById('btn-ouvrir-favoris');
  const btnFermer = document.getElementById('btn-fermer-favoris');
  const overlay = document.getElementById('modal-favoris-overlay');
  const modal = document.getElementById('modal-favoris');
  const btnVider = document.getElementById('btn-vider-favoris');
  
  if (!btnOuvrir || !modal) return;
  
  // Ouvrir la modale
  btnOuvrir.addEventListener('click', function() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Bloquer le scroll
    afficherFavorisModalе();
  });
  
  // Fermer la modale
  function fermerModale() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Réactiver le scroll
  }
  
  if (btnFermer) {
    btnFermer.addEventListener('click', fermerModale);
  }
  
  if (overlay) {
    overlay.addEventListener('click', fermerModale);
  }
  
  // Fermer avec Échap
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      fermerModale();
    }
  });
  
  // Vider tous les favoris
  if (btnVider) {
    btnVider.addEventListener('click', function() {
      if (confirm('⚠️ Êtes-vous sûr de vouloir supprimer tous vos favoris ?')) {
        favoris = [];
        sauvegarderFavoris();
        mettreAJourBadgeFavoris();
        afficherFavorisModale();
        afficherMissionsFromData(); // Rafraîchir la page missions
        afficherNotification('🗑️ Tous les favoris ont été supprimés');
      }
    });
  }
}

// Afficher les favoris dans la modale
function afficherFavorisModale() {
  const conteneur = document.getElementById('modal-favoris-body');
  const emptyState = document.getElementById('favoris-empty');
  const totalCount = document.getElementById('favoris-total-count');
  
  if (!conteneur) return;
  
  // Mettre à jour le compteur
  if (totalCount) {
    totalCount.textContent = favoris.length;
  }
  
  // Si aucun favori
  if (favoris.length === 0) {
    if (emptyState) {
      emptyState.style.display = 'block';
    }
    // Cacher toutes les cartes existantes
    conteneur.querySelectorAll('.carte-favori').forEach(carte => carte.remove());
    return;
  }
  
  // Cacher l'état vide
  if (emptyState) {
    emptyState.style.display = 'none';
  }
  
  // Supprimer les anciennes cartes
  conteneur.querySelectorAll('.carte-favori').forEach(carte => carte.remove());
  
  // Afficher les cartes favoris
  favoris.forEach(missionId => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;
    
    const carte = creerCarteFavori(mission);
    conteneur.appendChild(carte);
  });
}

// Créer une carte favori
function creerCarteFavori(mission) {
  const carte = document.createElement('div');
  carte.className = 'carte-favori';
  carte.dataset.missionId = mission.id;
  
  carte.innerHTML = `
    <div class="carte-favori-image">
      <img src="${mission.image}" alt="${mission.name}" onerror="this.src='images/default.png'">
    </div>
    <div class="carte-favori-content">
      <h3 class="carte-favori-titre">
        <span>⭐</span>
        ${mission.name}
      </h3>
      <div class="carte-favori-info">
        <span><strong>Agence:</strong> ${mission.agency}</span>
        <span><strong>Date:</strong> ${new Date(mission.launchDate).toLocaleDateString('fr-FR')}</span>
      </div>
      <p class="carte-favori-description">${mission.description}</p>
      <div class="carte-favori-actions">
        <button class="btn-retirer-favori" data-id="${mission.id}">
          Retirer
        </button>
        <button class="btn-voir-details" data-id="${mission.id}">
          Voir détails
        </button>
      </div>
    </div>
  `;
  
  // Événement retirer
  const btnRetirer = carte.querySelector('.btn-retirer-favori');
  btnRetirer.addEventListener('click', function() {
    carte.classList.add('removing');
    setTimeout(() => {
      toggleFavori(mission.id);
      afficherFavorisModale();
    }, 400);
  });
  
  // Événement voir détails
  const btnVoir = carte.querySelector('.btn-voir-details');
  btnVoir.addEventListener('click', function() {
    // Fermer la modale
    document.getElementById('modal-favoris').classList.remove('active');
    document.body.style.overflow = '';
    
    // Scroller vers la mission sur la page
    if (window.location.pathname.includes('missions.html')) {
      const missionElement = document.querySelector(`[data-mission-id="${mission.id}"]`);
      if (missionElement) {
        missionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        missionElement.style.animation = 'pulse 1s ease';
      }
    } else {
      // Rediriger vers la page missions
      window.location.href = `missions.html?mission=${mission.id}`;
    }
  });
  
  return carte;
}

// Mettre à jour le badge de compteur
function mettreAJourBadgeFavoris() {
  const badge = document.getElementById('favoris-count');
  if (!badge) return;
  
  if (favoris.length > 0) {
    badge.textContent = favoris.length;
    badge.style.display = 'block';
  } else {
    badge.style.display = 'none';
  }
}

// Mettre à jour toggleFavori pour inclure le badge
const originalToggleFavori = toggleFavori;
toggleFavori = function(missionId) {
  originalToggleFavori(missionId);
  mettreAJourBadgeFavoris();
  
  // Si la modale est ouverte, la rafraîchir
  const modal = document.getElementById('modal-favoris');
  if (modal && modal.classList.contains('active')) {
    afficherFavorisModale();
  }
};

// Initialiser au chargement
document.addEventListener('DOMContentLoaded', function() {
  initialiserModaleFavoris();
  mettreAJourBadgeFavoris();
});