// script.js
const playlist = [
    { title: "Song 1", src: "music/song1.mp3", category: "Pop" },
    { title: "Song 2", src: "music/song2.mp3", category: "Rock" },
    { title: "Song 3", src: "music/song3.mp3", category: "Jazz" },
  ];
  
  const audio = document.getElementById("audio");
  const playBtn = document.getElementById("play");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const volumeControl = document.getElementById("volume");
  const playlistElement = document.getElementById("playlist");
  const searchInput = document.getElementById("search");
  const categories = document.querySelectorAll(".category");
  const currentSong = document.getElementById("current-song");
  
  let currentIndex = 0;
  
  // Load playlist dynamically
  function loadPlaylist(filter = "All") {
    playlistElement.innerHTML = "";
    const filteredSongs = playlist.filter(song =>
      filter === "All" ? true : song.category === filter
    );
  
    filteredSongs.forEach((song, index) => {
      const li = document.createElement("li");
      li.textContent = song.title;
      li.dataset.index = index;
      li.addEventListener("click", () => playSong(index));
      playlistElement.appendChild(li);
    });
  }
  
  // Play song
  function playSong(index) {
    currentIndex = index;
    audio.src = playlist[currentIndex].src;
    currentSong.textContent = playlist[currentIndex].title;
    audio.play();
    playBtn.textContent = "⏸️";
  }
  
  // Play/Pause toggle
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = "⏸️";
    } else {
      audio.pause();
      playBtn.textContent = "▶️";
    }
  });
  
  // Skip to next
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    playSong(currentIndex);
  });
  
  // Skip to previous
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong(currentIndex);
  });
  
  // Volume control
  volumeControl.addEventListener("input", (e) => {
    audio.volume = e.target.value;
  });
  
  // Search functionality
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filteredSongs = playlist.filter(song =>
      song.title.toLowerCase().includes(query)
    );
    playlistElement.innerHTML = "";
    filteredSongs.forEach((song, index) => {
      const li = document.createElement("li");
      li.textContent = song.title;
      li.dataset.index = index;
      li.addEventListener("click", () => playSong(index));
      playlistElement.appendChild(li);
    });
  });
  
  // Category filtering
  categories.forEach(category => {
    category.addEventListener("click", () => {
      const filter = category.dataset.category;
      loadPlaylist(filter);
    });
  });
  
  // Initial load
  loadPlaylist();
  