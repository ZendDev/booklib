<template>
  <div id="app">
    <header class="header">
      <div class="logo">
        <a class="logo__link" href="">Modum Lab</a>
      </div>
    </header>
    <main class="content">  
      <List />
    </main>
  </div>
</template>

<script>
import List from './components/List'

export default {
  name: 'app',
  components: {
    List
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500&display=swap');
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body{
    background-color: #f4f6f6;    
  }
  body,
  h1,
  h2,
  h3,
  h4,
  p {
    margin: 0;
    font-family: 'Ubuntu', sans-serif;
  }
  ul{
    list-style: none;
    padding:0;
    margin:0;
  }
  .header{
    background-color: #eff3f8;
    height:80px;
  }
  .logo{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &__link{
      display: block;
      overflow: hidden;
      text-indent: 110%;
      white-space: nowrap;
      background: url(./assets/logo.svg) no-repeat;
      width: 220px;
      height: 35px;
      background-size: 100%;   
    }
  }
  .content{
    margin-top: 40px;
  }
</style>
