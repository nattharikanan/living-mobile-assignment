<template>
<div>
  <div id="menu">
        <div class="image">
          <img :src="require('./assets/FoodStory_Logo.png')">
        </div>
     <ul>
       
          <li><a href="/store" >store</a></li>
          <li><a href="/category" >category</a></li>
          <li><a href="/menu">menu</a></li>
     </ul>
  </div>
  <div class="main">
    <router-view/>
  </div>
</div>

</template>
<style scoped>
 
</style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
@import './assets/css/style.css';
  #menu {
     background-color: #28B7FF;
      color: #333;
      line-height: 60px;
      height: 60px;
      position: absolute;
      left: 0%;
      right: 0%;
      top: 0%;
      bottom: 0%;
      padding-left: 13px;
  }

  #menu ul {
      padding-left: 13px;
      margin: 0;
      list-style: none;
      height: auto;
      padding-left: 170px;
  }

  #menu li {
      display: inline;
      /* padding: 15px 30px; */
  }

  #menu a {
      color: #FFF;
      padding: 0px  30px;
      text-decoration: none;
      font-family: Rubik;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      /* margin: 0 40px; */
  }

  #menu a:hover {
      background-color: #FFF;
      color: #28B7FF;
      border-radius: 12px;
      padding: 8px 16px;
      margin: 0px 14px;
  }
  .main{
    margin-top: 92px;
    position: relative;
    background: #FFFFFF;
    padding: 40px 100px;
  }
  .image{
    position: absolute;
    top: 10px;
    left: 30px;
   /* bottom: px; */
  }
</style>