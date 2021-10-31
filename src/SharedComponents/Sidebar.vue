<template>
  <div>
    <label for="sidebar-hamburger" class="sidebar-hamburger">&#9776;</label>
    <input type="checkbox" id="sidebar-hamburger" class="hidden" />
    <div class="sidebar-container">
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.sidebar-container {
  position: absolute;
  float: left;
  background-color: white;
  height: 100%;
  overflow-x: hidden;
}
.sidebar-container > div {
  padding: 10px;
  overflow-x: hidden;
}
.sidebar-container > div > div {
  margin: 10px;
}
.sidebar-hamburger {
  display: none;
}
@media only screen and (max-device-width: 480px) {
  .sidebar-container {
    width: 0px;
    box-shadow: 5px 10px 8px #888888;
  }
  .sidebar-hamburger {
    display: block;
    size: 30px;
  }
  #sidebar-hamburger:checked ~ .sidebar-container {
    transition: all 1s;
    width: 80%;
  }
  #sidebar-hamburger > span {
    display: none;
  }
}
</style>
