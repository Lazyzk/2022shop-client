<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(shopCart,index) in  shopCartList" :key="shopCart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="shopCart.isChecked" @click="updateOne(shopCart)">
          </li>
          <li class="cart-list-con2">
            <img :src="shopCart.imgUrl">
            <div class="item-msg">{{shopCart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{shopCart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeCartNum(shopCart,-1,true)">-</a>
            <input autocomplete=" off" type="text" :value="shopCart.skuNum" minnum="1" class="itxt"
              @change="changeCartNum(shopCart,$event.target.value*1,false)">
            <a href="javascript:void(0)" class="plus" @click="changeCartNum(shopCart,1,true)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{shopCart.skuPrice*shopCart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteOne(shopCart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllCheck">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkedNum}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allMoney}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import store from '@/store'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'ShopCart',
  mounted() {
    this.getCartList()
  },
  methods: {
    getCartList() {
      this.$store.dispatch('getCartList')
    },
    async changeCartNum(shopCart, disNum, flag) {
      if (!flag) {
        if (disNum > 0) {
          disNum = disNum - shopCart.skuNum
        } else {
          disNum = 1 - shopCart.skuNum
        }
      } else {
        if (disNum + shopCart.skuNum <= 0) {
          disNum = 1 - shopCart.skuNum
        }
      }
      try {
        await this.$store.dispatch('addOrUpdateCart', { skuId: shopCart.skuId, skuNum: disNum })
        this.getCartList()
      } catch (error) {
        alert(error.message)
      }
    },
    async updateOne(shopCart) {
      try {
        await this.$store.dispatch('updateCartChecked', { skuId: shopCart.skuId, isChecked: shopCart.isChecked ? 0 : 1 })
        alert('修改状态成功')
        this.getCartList()
      } catch (error) {
        alert(error.message)
      }
    },
    async deleteOne(shopCart) {
      try {
        await this.$store.dispatch('getDeleteCart', shopCart.skuId)
        alert('删除成功')
        this.getCartList()
      } catch (error) {
        alert(error.message)
      }
    },
    async deleteAll() {
      try {
        await this.$store.dispatch('getDeleteCartAll')
        if (this.shopCartList.some(item => item.isChecked)) {
          alert('所选删除成功')
        } else {
          alert('没有勾选的商品')
        }
        // alert('所选删除成功')
        this.getCartList()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapState({
      shopCartList: state => state.shopcart.shopCartList
    }),
    // ...mapGetters(['cartInfoList']),

    checkedNum() {
      //1.reduce和迭代方法（map、fliter、forEach）一样，
      // 会遍历数组；reduce()方法会遍历数组中的每一个元素，
      // 每遍历一次就会执行一次回调函数。当遍历完之后会将最后的结果返回出去。
      // 2.reduce( )方法有两个参数，第一个参数是累加函数，第二个是函数的previousValue的初始值。
      return this.shopCartList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.skuNum
        }
        return prev
      }, 0)
    },
    allMoney() {
      return this.shopCartList.reduce((prev, item) => {
        if (item.isChecked) {
          prev += item.skuPrice * item.skuNum
        }
        return prev
      }, 0)
    },
    isAllCheck: {
      get() {
        return this.shopCartList.every(item => item.isChecked)
      },
      async set(val) {
        // this.$store.dispatch('updateCartCheckedAll',val?1:0) 是调用updateCartCheckedAll异步函数
        // 它的结果拿的是异步函数的返回值 固定的那个promise，不是函数return后面Promise.all的返回值promise
        // 但是这个promise的结果和return后面Promise.all的返回值promise的状态结果一致
        try {
          const result = await this.$store.dispatch('updateCartCheckedAll', val ? 1 : 0)
          // alert('修改所有的状态成功')
          this.getCartList()
        } catch (error) {
          alert(error.message)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>