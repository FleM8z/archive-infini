
// ============================================================
// RECHERCHE DE L'ARCHIVE
// ============================================================

const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

const archive = [
    {
        name: "Diablo II",
        category: "Gaming",
        description: "Jeu vidéo et expérience personnelle."
    },
    {
        name: "Canva",
        category: "Création",
        description: "Outil de création graphique."
    },
    {
        name: "Level ∞ Gaming",
        category: "Projet",
        description: "Projet personnel autour du gaming."
    },
    {
        name: "HTML",
        category: "Tech",
        description: "Technologie utilisée pour construire le site."
    },
    {
        name: "JavaScript",
        category: "Tech",
        description: "Langage utilisé pour les interactions."
    }
];

if (searchInput && searchResult) {

    searchInput.addEventListener("input", function () {

        const search = searchInput.value
            .toLowerCase()
            .trim();

        if (search === "") {
            searchResult.innerHTML = "";
            return;
        }

        const results = archive.filter(item =>
            item.name.toLowerCase().includes(search) ||
            item.category.toLowerCase().includes(search) ||
            item.description.toLowerCase().includes(search)
        );

        if (results.length === 0) {

            searchResult.innerHTML =
                "Aucune entrée trouvée.";

            return;
        }

        searchResult.innerHTML = results
            .map(item => `
                <div style="margin-top:15px;">
                    <strong>${item.name}</strong>
                    <br>
                    <small>
                        ${item.category} · ${item.description}
                    </small>
                </div>
            `)
            .join("");

    });

}


// ============================================================
// RÉCUPÉRATION DU JEU
// ============================================================

const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");


// ============================================================
// FICHE D'UN JEU
// ============================================================

if (gameId && typeof games !== "undefined") {

    const game = games.find(item => item.id === gameId);

    if (game) {

        // ====================================================
        // MUSIQUE DU JEU
        // ====================================================

        const gameMusic =
            document.getElementById("gameMusic");

        const musicButton =
            document.getElementById("musicButton");

        if (
            gameMusic &&
            musicButton &&
            game.music
        ) {

            gameMusic.src = game.music;
            gameMusic.volume = 0.35;

            musicButton.addEventListener("click", () => {

                if (gameMusic.paused) {

                    gameMusic.play().catch(error => {
                        console.warn(
                            "Lecture audio impossible :",
                            error
                        );
                    });

                    musicButton.textContent =
                        "♫ MUSIQUE : ON";

                    musicButton.classList.add("playing");

                } else {

                    gameMusic.pause();

                    musicButton.textContent =
                        "♫ MUSIQUE : OFF";

                    musicButton.classList.remove("playing");

                }

            });

        } else if (musicButton) {

            musicButton.style.display = "none";

        }


        // ====================================================
        // IDENTITÉ
        // ====================================================

        const gameTitle =
            document.getElementById("gameTitle");

        const gameIntroduction =
            document.getElementById("gameIntroduction");

        const gamePlatform =
            document.getElementById("gamePlatform");

        const gameGenre =
            document.getElementById("gameGenre");

        const gameYear =
            document.getElementById("gameYear");

        const gameStatus =
            document.getElementById("gameStatus");

        if (gameTitle)
            gameTitle.textContent = game.title;

        if (gameIntroduction)
            gameIntroduction.textContent = game.introduction;

        if (gamePlatform)
            gamePlatform.textContent = game.platform;

        if (gameGenre)
            gameGenre.textContent = game.genre;

        if (gameYear)
            gameYear.textContent = game.year;

        if (gameStatus)
            gameStatus.textContent = game.status;


        // ====================================================
        // NOTE
        // ====================================================

        const gameRating =
            document.getElementById("gameRating");

        const ratingFill =
            document.getElementById("ratingFill");

        const ratingController =
            document.getElementById("ratingController");

        const rating =
            Number(game.rating) || 0;

        if (gameRating)
            gameRating.textContent = rating;

        if (ratingFill)
            ratingFill.style.width =
                `${rating * 10}%`;

        if (ratingController)
            ratingController.style.left =
                `${rating * 10}%`;


        // ====================================================
        // COVER
        // ====================================================

        const gameCover =
            document.getElementById("gameCover");

        if (gameCover && game.cover) {

            gameCover.src = game.cover;

            gameCover.alt =
                `Couverture de ${game.title}`;

        }


        // ====================================================
        // MA FICHE
        // ====================================================

        const personalFields = {
            gameFirstPlayed: game.firstPlayed,
            gameTimePlayed: game.timePlayed,
            gameCharacter: game.mainCharacter,
            gameClass: game.mainClass,
            gameProgression: game.progression,
            gamePlayStyle: game.playStyle,
            gameDifficulty: game.difficulty,
            gameSoloMultiplayer: game.soloOrMultiplayer
        };

        Object.entries(personalFields).forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(id);

                if (element) {
                    element.textContent =
                        value ?? "";
                }

            }
        );


        // ====================================================
        // MON HISTOIRE
        // ====================================================

        const historyFields = {
            gameDiscovery: game.discovery,
            gameFirstImpression: game.firstImpression,
            gameHistory: game.history
        };

        Object.entries(historyFields).forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(id);

                if (element) {
                    element.textContent =
                        value ?? "";
                }

            }
        );


        // ====================================================
        // MON EXPÉRIENCE
        // ====================================================

        const experienceFields = {
            gameExperience: game.experience,
            gameGameplay: game.gameplay,
            gameProgressionExperience:
                game.progressionExperience,
            gameExploration: game.exploration
        };

        Object.entries(experienceFields).forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(id);

                if (element) {
                    element.textContent =
                        value ?? "";
                }

            }
        );


        // ====================================================
        // CE QUE J'AIME
        // ====================================================

        const likedList =
            document.getElementById("likedList");

        if (likedList) {

            likedList.innerHTML = "";

            const liked =
                Array.isArray(game.liked)
                    ? game.liked
                    : [];

            liked.forEach(item => {

                const element =
                    document.createElement("div");

                element.className =
                    "bullet-item";

                element.textContent =
                    "＋ " + item;

                likedList.appendChild(element);

            });

        }


        // ====================================================
        // CE QUE J'AIME MOINS
        // ====================================================

        const dislikedList =
            document.getElementById("dislikedList");

        if (dislikedList) {

            dislikedList.innerHTML = "";

            const disliked =
                Array.isArray(game.disliked)
                    ? game.disliked
                    : [];

            disliked.forEach(item => {

                const element =
                    document.createElement("div");

                element.className =
                    "bullet-item";

                element.textContent =
                    "− " + item;

                dislikedList.appendChild(element);

            });

        }


        // ====================================================
        // MES MOMENTS
        // ====================================================

        const momentsFields = {
            gameFavoriteMoment:
                game.favoriteMoment,

            gameMemorableMoment:
                game.memorableMoment,

            gameFunniestMoment:
                game.funniestMoment,

            gameHardestMoment:
                game.hardestMoment,

            gameBiggestAchievement:
                game.biggestAchievement
        };

        Object.entries(momentsFields).forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(id);

                if (element) {
                    element.textContent =
                        value ?? "";
                }

            }
        );


        // ====================================================
        // MON AVIS
        // ====================================================

        const opinionFields = {
            gameOverallOpinion:
                game.overallOpinion,

            gameWouldRecommend:
                game.wouldRecommend,

            gameWouldReplay:
                game.wouldReplay,

            gameWhatMakesItSpecial:
                game.whatMakesItSpecial
        };

        Object.entries(opinionFields).forEach(
            ([id, value]) => {

                const element =
                    document.getElementById(id);

                if (element) {
                    element.textContent =
                        value ?? "";
                }

            }
        );


        // ====================================================
        // SOUVENIRS
        // ====================================================

        const memories =
            document.getElementById("gameMemories");

        if (memories) {

            memories.textContent =
                game.memories ?? "";

        }


        // ====================================================
        // NOTE PERSONNELLE
        // ====================================================

        const personalNote =
            document.getElementById("gamePersonalNote");

        if (personalNote) {

            personalNote.textContent =
                game.personalNote ?? "";

        }


        // ====================================================
        // GALERIE
        // ====================================================

        const gameGallery =
            document.getElementById("gameGallery");

        const lightbox =
            document.getElementById("lightbox");

        const lightboxImage =
            document.getElementById("lightboxImage");

        const lightboxCounter =
            document.getElementById("lightboxCounter");

        const lightboxClose =
            document.getElementById("lightboxClose");

        const lightboxPrev =
            document.getElementById("lightboxPrev");

        const lightboxNext =
            document.getElementById("lightboxNext");

        let currentImage = 0;


        // ----------------------------------------------------
        // FONCTIONS UTILITAIRES
        // ----------------------------------------------------

        function isVideo(media) {

            if (!media) return false;

            const cleanMedia =
                media.split("?")[0].toLowerCase();

            return (
                cleanMedia.endsWith(".mp4") ||
                cleanMedia.endsWith(".webm") ||
                cleanMedia.endsWith(".ogg")
            );

        }


        function getImageIndexes() {

            if (!Array.isArray(game.gallery)) {
                return [];
            }

            return game.gallery
                .map((media, index) => ({
                    media,
                    index
                }))
                .filter(item => !isVideo(item.media))
                .map(item => item.index);

        }


        // ----------------------------------------------------
        // CRÉATION DE LA GALERIE
        // ----------------------------------------------------

        if (
            gameGallery &&
            Array.isArray(game.gallery) &&
            game.gallery.length > 0
        ) {

            gameGallery.innerHTML = "";

            game.gallery.forEach(
                (media, index) => {

                    // ================================
                    // VIDÉO
                    // ================================

                    if (isVideo(media)) {

                        const videoElement =
                            document.createElement("video");

                        videoElement.src =
                            media;

                        videoElement.controls =
                            true;

                        videoElement.preload =
                            "metadata";

                        videoElement.className =
                            "gallery-video";

                        videoElement.addEventListener(
                            "click",
                            event => {
                                event.stopPropagation();
                            }
                        );

                        gameGallery.appendChild(
                            videoElement
                        );

                    }

                    // ================================
                    // IMAGE
                    // ================================

                    else {

                        const imageElement =
                            document.createElement("img");

                        imageElement.src =
                            media;

                        imageElement.alt =
                            `Capture de ${game.title}`;

                        imageElement.loading =
                            "lazy";

                        imageElement.addEventListener(
                            "click",
                            () => {

                                currentImage =
                                    index;

                                openLightbox();

                            }
                        );

                        gameGallery.appendChild(
                            imageElement
                        );

                    }

                }
            );


            // =================================================
            // LIGHTBOX
            // =================================================

            function openLightbox() {

                if (
                    !lightbox ||
                    !lightboxImage ||
                    !Array.isArray(game.gallery)
                ) {
                    return;
                }

                const imageIndexes =
                    getImageIndexes();

                if (imageIndexes.length === 0) {
                    return;
                }


                // Si l'index actuel est une vidéo,
                // on prend la première image disponible.

                if (
                    !imageIndexes.includes(currentImage)
                ) {

                    currentImage =
                        imageIndexes[0];

                }


                const media =
                    game.gallery[currentImage];

                if (isVideo(media)) {
                    return;
                }


                lightboxImage.src =
                    media;

                lightboxImage.alt =
                    `Capture de ${game.title}`;


                // CORRECTION IMPORTANTE :
                // ici on utilise des backticks,
                // pas des apostrophes.

                const position =
                    imageIndexes.indexOf(currentImage) + 1;

                if (lightboxCounter) {

                    lightboxCounter.textContent =
                        `${position} / ${imageIndexes.length}`;

                }


                lightbox.classList.add("active");

            }


            function closeLightbox() {

                if (!lightbox) {
                    return;
                }

                lightbox.classList.remove("active");

            }


            function showNextImage() {

                const imageIndexes =
                    getImageIndexes();

                if (imageIndexes.length === 0) {
                    return;
                }

                let position =
                    imageIndexes.indexOf(currentImage);

                if (position === -1) {
                    position = 0;
                } else {
                    position++;
                }

                if (
                    position >=
                    imageIndexes.length
                ) {
                    position = 0;
                }

                currentImage =
                    imageIndexes[position];

                openLightbox();

            }


            function showPreviousImage() {

                const imageIndexes =
                    getImageIndexes();

                if (imageIndexes.length === 0) {
                    return;
                }

                let position =
                    imageIndexes.indexOf(currentImage);

                if (position === -1) {
                    position = 0;
                } else {
                    position--;
                }

                if (position < 0) {
                    position =
                        imageIndexes.length - 1;
                }

                currentImage =
                    imageIndexes[position];

                openLightbox();

            }


            // =================================================
            // BOUTON FERMER
            // =================================================

            if (lightboxClose) {

                lightboxClose.addEventListener(
                    "click",
                    closeLightbox
                );

            }


            // =================================================
            // IMAGE SUIVANTE
            // =================================================

            if (lightboxNext) {

                lightboxNext.addEventListener(
                    "click",
                    showNextImage
                );

            }


            // =================================================
            // IMAGE PRÉCÉDENTE
            // =================================================

            if (lightboxPrev) {

                lightboxPrev.addEventListener(
                    "click",
                    showPreviousImage
                );

            }


            // =================================================
            // FERMER EN CLIQUANT À CÔTÉ
            // =================================================

            if (lightbox) {

                lightbox.addEventListener(
                    "click",
                    event => {

                        if (
                            event.target ===
                            lightbox
                        ) {

                            closeLightbox();

                        }

                    }
                );

            }


            // =================================================
            // CLAVIER
            // =================================================

            document.addEventListener(
                "keydown",
                event => {

                    if (
                        !lightbox ||
                        !lightbox.classList.contains("active")
                    ) {
                        return;
                    }

                    if (
                        event.key === "Escape"
                    ) {

                        closeLightbox();

                    }

                    if (
                        event.key === "ArrowRight"
                    ) {

                        showNextImage();

                    }

                    if (
                        event.key === "ArrowLeft"
                    ) {

                        showPreviousImage();

                    }

                }
            );

        }

    }

}


// ============================================================
// BIBLIOTHÈQUE GAMING
// ============================================================

const gamesGrid =
    document.getElementById("gamesGrid");

const gameSearch =
    document.getElementById("gameSearch");

const gameCount =
    document.getElementById("gameCount");

const noGames =
    document.getElementById("noGames");

const filterButtons =
    document.querySelectorAll(".filter-button");

const viewButtons =
    document.querySelectorAll(".view-button");


if (
    gamesGrid &&
    typeof games !== "undefined"
) {

    let currentFilter = "all";
    let currentView = "mosaic";


    // ========================================================
    // VUE PAR DÉFAUT
    // ========================================================

    gamesGrid.classList.add(
        "view-mosaic"
    );


    // ========================================================
    // CHANGEMENT DE VUE
    // ========================================================

    viewButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                viewButtons.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });

                button.classList.add(
                    "active"
                );

                currentView =
                    button.dataset.view;


                gamesGrid.classList.remove(
                    "view-large",
                    "view-mosaic"
                );

                gamesGrid.classList.add(
                    `view-${currentView}`
                );

            }
        );

    });


    // ========================================================
    // AFFICHAGE DES JEUX
    // ========================================================

    function displayGames() {

        const search =
            gameSearch
                ? gameSearch.value
                    .toLowerCase()
                    .trim()
                : "";


        const filteredGames =
            games.filter(game => {

                const title =
                    String(game.title || "")
                        .toLowerCase();

                const platform =
                    String(game.platform || "")
                        .toLowerCase();


                const matchesSearch =
                    title.includes(search);


                const matchesFilter =
                    currentFilter === "all" ||
                    platform.includes(
                        currentFilter.toLowerCase()
                    );


                return (
                    matchesSearch &&
                    matchesFilter
                );

            });


        gamesGrid.innerHTML = "";


        if (gameCount) {

            gameCount.textContent =
                filteredGames.length;

        }


        if (filteredGames.length === 0) {

            if (noGames) {

                noGames.style.display =
                    "block";

            }

            return;

        }


        if (noGames) {

            noGames.style.display =
                "none";

        }


        // ====================================================
        // CRÉATION DES CARTES
        // ====================================================

        filteredGames.forEach(game => {

            const card =
                document.createElement("a");

            card.className =
                "game-card";

            card.href =
                `game.html?id=${encodeURIComponent(game.id)}`;


            // =================================================
            // COVER
            // =================================================

            const cover =
                game.cover
                    ? `
                        <div class="game-card-cover">

                            <img
                                src="${game.cover}"
                                alt="Couverture de ${game.title}"
                                loading="lazy"
                            >

                        </div>
                    `
                    : `
                        <div class="game-card-cover">

                            <div class="no-cover">
                                ∞
                            </div>

                        </div>
                    `;


            // =================================================
            // CONTENU
            // =================================================

            card.innerHTML = `

                ${cover}

                <div class="game-card-content">

                    <h3>
                        ${game.title || "Jeu sans titre"}
                    </h3>

                    <p class="game-card-meta">
                        ${game.platform || ""}
                        ${game.genre ? ` · ${game.genre}` : ""}
                    </p>

                </div>

            `;


            gamesGrid.appendChild(card);


            // =================================================
            // EFFET 3D DE LA COVER
            // =================================================

            const coverElement =
                card.querySelector(
                    ".game-card-cover"
                );


            if (coverElement) {

                card.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;

                        const y =
                            event.clientY -
                            rect.top;


                        const centerX =
                            rect.width / 2;

                        const centerY =
                            rect.height / 2;


                        const rotateY =
                            ((x - centerX) /
                                centerX) * 10;

                        const rotateX =
                            ((centerY - y) /
                                centerY) * 10;


                        coverElement.style.transform = `
                            translateY(-10px)
                            rotateX(${rotateX}deg)
                            rotateY(${rotateY}deg)
                        `;


                        coverElement.style.setProperty(
                            "--mouse-x",
                            `${(x / rect.width) * 100}%`
                        );


                        coverElement.style.setProperty(
                            "--mouse-y",
                            `${(y / rect.height) * 100}%`
                        );

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        coverElement.style.transform = `
                            translateY(0)
                            rotateX(0deg)
                            rotateY(0deg)
                        `;


                        coverElement.style.setProperty(
                            "--mouse-x",
                            "50%"
                        );


                        coverElement.style.setProperty(
                            "--mouse-y",
                            "50%"
                        );

                    }
                );

            }

        });

    }


    // ========================================================
    // RECHERCHE
    // ========================================================

    if (gameSearch) {

        gameSearch.addEventListener(
            "input",
            displayGames
        );

    }


    // ========================================================
    // FILTRES
    // ========================================================

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter ||
                    "all";


                displayGames();

            }
        );

    });


    // ========================================================
    // AFFICHAGE INITIAL
    // ========================================================

    displayGames();

}

