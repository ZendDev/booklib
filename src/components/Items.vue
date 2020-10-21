<template>
  <article class="book">
    <h2 class="book__title">{{item.name}}</h2>
    <div class="book__desc">{{item.description}}</div>
    <div class="book__info">
      <span>Автор: {{item.author}}</span>
      <span>Год издания: {{item.year}}</span>
    </div>
  </article>
</template>

<script>
export default {
  name: 'BookItem',
  props: {
    item: Object
  }
}
</script>

<style lang="scss">
  .book{
      background: #FFF;
      border-radius: 4px;
      padding: 20px;
      box-shadow: 0 6px 12px rgba(220, 220, 220, 0.25);
      margin-bottom: 20px;  
      &__title{
        color: #333a4d;
        font-weight: 500;
        font-size: 23px;        
      }   
      &__desc{
        line-height: 1.2;
        margin-top: 20px; 
        color:#333a4d;       
      } 
      &__info{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 25px;        
      }
  }
</style>