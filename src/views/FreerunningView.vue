<template>
  <div class="freerunning-page">
    <div class="video-container">
      <div>
        <h1>Gainer full</h1>
        <video controls width="800">
          <source :src="GainerFullVideo" type="video/mp4">
        </video>
      </div>
      <div>
        <h1>Wall full</h1>
        <video controls width="800">
          <source :src="WallFullVideo" type="video/mp4">
        </video>
      </div>
      <div>
        <h1>FLifest fail</h1>
        <video controls width="800">
          <source :src="flifestVideo" type="video/mp4">
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import GainerFull from '@/assets/gainer_full.mp4'; // Corrected import statement
import WallFull from '@/assets/wall_full.mp4'; // Corrected import statement
import FifestFail from '@/assets/flifest_fail.mp4'; // Corrected import statement

export default {
  name: 'FreerunningView',
  data() {
    return {
      GainerFullVideo: GainerFull, // Using the imported video
      WallFullVideo: WallFull, // Using the imported video
      flifestVideo: FifestFail // Using the imported video
    };
  },
};
</script>

<style>
#app {
  margin-top: 60px;

  h1 {
    /* Align center properties */
    text-align: center; /* Centers horizontally */
    margin: 0; /* Optional: Remove default margin */
  }

  .freerunning-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 800px;
  }

  .video-container {
    max-width: 1100px;
    min-width: 1100px;
    width: 100%;
    display: flex;
  }

  video {
    border: 1px solid #ababab;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Shadow for the video element */
    max-width: 100%; /* Full width of parent container */
    height: auto; /* Maintain aspect ratio */
  }
}

</style>