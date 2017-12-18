<template>
  <div class="example-list">
    <List
      show-text
      is-link
      is-title-cut2
      is-text-cut1
      :is-big-pic="isBigPic"
      :col="cols"
      left-box-class="example-list_leftBox"
      :items="items"
      :img-scale="imgScale"
      @click="handleClick"
      ref="compsList"
    >
    </List>
  </div>
</template>

<script>
  import ProductService from '../service/ProductService';

  export default {
    data() {
      return {
        cols: '1', // 设置一行几列
        isBigPic: false, // 设置是否大图模式,只有1列时有大图模式
        imgScale: 640 / 640, // 设置图片宽高比例
        middleCont: {  //  解决 说明文档内的作用域插槽找不到作用域bug
          data: {}
        },
        items: []
      };
    },

    mounted() {
      this.getProductList();
    },

    methods: {
      handleClick: function (item) {
        this.$router.push({
          path: '/detail',
          query: {
            id: item.id,
            imgSrc: item.imgsrc,
            text: item.text,
            title: item.title
          }
        });
      },

      getProductList() {
        ProductService.getProductList().then((data) => {
          if (data) {
            this.items = data;
          }
        });
      }
    },
    created: function () {
      // $nextTick在修改数据之后立即使用，等待 DOM 更新。有数据后给图片容器设置高度
      this.$nextTick(function () {
        // 大图模式
        if (this.isBigPic) {
          this.$refs.compsList.imgHeight(this.imgScale, '.example-list_leftBox');
        }
        // 两列模式
        if (this.cols === '2' && !this.isBigPic) {
          this.$refs.compsList.imgHeight(1, '.example-list_leftBox');
        }
      });
    }
  };
</script>

<style>
  .example-list {
  }

  .comps-list .column, .comps-list .columns {
    margin: 0;
  }

  .comps-list_item .example-list_soldout {
    position: absolute;
    top: 10px;
    left: 10px;
    color: red;
  }

  .comps-list .columns {
    display: block;
  }
</style>
