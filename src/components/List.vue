<template>
    <div class="wrapper">
        <h1>Библиотека</h1>
        <ul class="categories">
            <li v-for="(category, index) in categories" :key="index" class="categories__item" :class="{active: category.actived}" @click="selectCategory(index)">
                {{ category.name }}
            </li>
        </ul>
        <!-- <div class="search">
          <input class="search__input" v-model="search" type="search" placeholder="Поиск книги">
        </div> -->
        <div class="books">
          <Items v-for="(book, index) in showBooks" :key="index" :item="book" />
        </div>
        <div v-show="showLoad" v-on:click="Count+=10" class="btn-load">Загрузить ещё</div>
    </div>
</template>

<script>
import Items from './Items'
const axios = require('axios')
export default {
  components: {
    Items
  },
  data: () => ({
    categories: [],
    Books: [],
    Count: 0,
    Next: false,
    Page: 1
  }),
  computed: {
    selectedCategories () {
      let actived = this.categories.filter(item => item.actived).map(item => item.id)
      if (actived.length === 0) {
        actived = this.categories.map(el => el.id)
      }

      return actived
    },
    showBooks () {
      if (this.Count > this.Books.length && this.Next) {
        this.changeBooks(false)
      }
      return this.Books.slice(0, this.Count)
    },
    showLoad () {
      return this.Count < this.Books.length || this.Next
    }
  },
  async mounted () {
    await this.getCategories()
    
  },
  methods: {
    async getCategories () {
      const response = await axios.post('https://webdev.modumlab.com/api/book/categories');

      if(response.data.status !== 'success') return

      response.data.data.list.forEach(elem => {
        this.categories.push({
          id: elem.id,
          name: elem.name,
          actived: false
        })
      })

      this.changeBooks()
    },   
    async changeBooks (reload = true) {
        if (reload) {
            this.Books = []
            this.Count = 10
            this.Page = 1
            this.Next = false
        }

        const response = axios.post('https://webdev.modumlab.com/api/book/list', {
          categories: this.selectedCategories,
          page: this.Page
        }).then(response => {          
            response.data.data.list.forEach(el => {
                this.Books.push(el)
            })
            
            this.Next = response.data.data.next
            this.Page = response.data.data.page + 1
        });
    },  
    selectCategory (index) {
      this.categories[index].actived = !this.categories[index].actived
      this.changeBooks()
    }
  }
}
</script>

<style lang="scss">
  .wrapper{
    max-width: 1050px;
    margin: auto;
    padding: 0 15px;
  }
  h1{
    font-size: 30px;
    font-weight: 500;
    color: #333a4d;
  }
  .content{
    padding-bottom:20px;
  }
  .categories{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 10px 0;
    &__item{
      color: #8b92a5; 
      border-radius: 4px;
      border: 1px solid #e2e8f0;   
      padding: 0 20px;
      height: 30px; 
      font-size: 14px;
      cursor: pointer; 
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      margin:10px 10px 10px 0;
      &:last-child{
        margin-right:0;
      }
      &.active{
        color:#FFF;
        box-shadow: 0 6px 12px rgba(55,143,246,0.25);
        background-color: #378ff6;
      }
    }
  }
  .btn-load{
    box-shadow: 0px 10px 20px rgba(55, 143, 246, 0.25);
    background: #378ff6;
    color: #FFF;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border-radius: 5px;
    width: 200px;
    margin: auto;
    cursor: pointer;
  }
  .search{
    margin-bottom:20px;
    position: relative;
    &:before{
      content: '';
      position: absolute;
      background: url(/dist/search.svg?2e59eb7…) no-repeat;
      width: 20px;
      height: 20px;
      background-size: 100%;
      top: 10px;
      left: 12px;
    }
    &__input{
      border: none;
      background: transparent;
      border:1px solid #e2e8f0;
      width: 100%;
      height: 40px;
      border-radius: 4px;
      padding-left: 40px;
      color: #333a4d;   
      outline:none;
      &::placeholder{
        color:#333a4d;
        font-family: 'Ubuntu', sans-serif;
      }   
    }
  }
</style>