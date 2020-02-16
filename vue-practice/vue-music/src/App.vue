<template>
  <div id="app">
    <header>
      <h1>我的歌单</h1>
    </header>
    <main>
      <section class="player">
        <h2 class="song-title">{{ current.title  }} - <span> {{ current.artist }}</span></h2>
        <!-- {{ songs[0].src }} -->
        <div class="control">
          <button class="prev" @click="prev">上一首</button>
          <button class="play" v-if="!isPlaying" @click="play">播放</button>
          <button class="pause" v-else @click="pause">暂停</button>
          <button class="next" @click="next">下一首</button>
        </div>
      </section>
      <section class="playlist">
        <h3>播放列表</h3>
        <button v-for="song in songs" :key="song.src" @click="play(song)" :class="(song.src == current.src) ? 'song playing' : 'song'">
          {{ song.title }} - {{song.artist}}
        </button>
      </section>
    </main>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      current : {},
      index: 0,
      isPlaying: false,
      songs: [
        {
          title: 'nndj',
          artist: 'zhj',
          src: require('./assets/nndj.mp3')
        },
        {
          title: 'djrm',
          artist: 'zhj',
          src: require('./assets/djrm.mp3')
        }
      ],
      player: new Audio()
    }
  },
  methods: {
    play(song) {
      if(typeof song.src !== "undefined") {
        this.current = song;

        this.player.src = this.current.src;
      }

      this.player.play();
      this.player.addEventListener('ended', function() {
        this.index++;
        if(this.index > this.songs.length - 1) {
          this.index = 0;
        }

        this.current = this.songs[this.index];
        this.play(this.current);
      }.bind(this));
      this.isPlaying = true;
    },
    pause () {
      this.player.pause();
      this.isPlaying = false;
    },
    next () {
      this.index++;
      if( this.index > this.songs.length - 1) {
        this.index  = 0;
      }

      this.current = this.songs[this.index];
      this.play(this.current);
    },
    prev () {
      this.index--;
      if( this.index <  0) {
        this.index  = this.songs.length - 1;
      }

      this.current = this.songs[this.index];
      this.play(this.current);
    }
  },
  created () {
    this.current = this.songs[this.index];
    this.player.src = this.current.src;
    // this.player.play();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
header {
  display: flex;
  justify-content: center;
  align-content: center;
  padding:15px;
  color:#fff;
  background-color: #212121;
}
main {
  width: 700px;
  margin: 0 auto;
  padding: 25px
}
.song-title {
  color: #53565a;
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  text-align:center;
}
.song-title span {
  font-weight: 400;
  font-style: italic;
}

.control {
  display: flex;
  justify-content: center;
  align-items: center;
  padding:30px 15px;
}
button {
  appearance: none;
  background-color:none;
  border: none;
  outline: none;
  cursor: pointer;
}
.play,.pause {
  font-size: 20px;
  font-weight: 700;
  padding: 15px 25px;
  border-radius: 8px;
  color:#fff;
  background-color: #cc2e50;
  }
.next,.prev {
  font-size: 16px;
  font-weight: 700;
  padding: 15px 25px;
  border-radius: 2px;
  color:#fff;
  background-color: #ff5858;
}
.palylist {
  padding: 0 30px;
}
.palylist h3 {
  color: #212121;
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 30px;
  text-align: center;
}
.playlist .song {
  display: block;
  width: 100%;
  padding: 15px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
}
.playlist .song:hover {
  color:#ff5858;
}
.playlist .song.playing {
  color:#fff;
  background-image: linear-gradient(to right, #cc2e5d, #ff5858);
}
</style>
