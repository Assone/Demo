<template>
  <footer>
    <div class="content">
      <div id="side">
        <div id="side__copyright">
          <span>版权所有 &copy; 华为软件技术有限公司 2020</span>
          <span>保留一切权利</span>
          <a href="http://www.beian.miit.gov.cn/">苏ICP备17040376号-32</a>
          <span>苏B2-20130048号</span>
          <span>代理域名注册服务机构：新网</span>
        </div>
        <div id="side__information">
          <a href="https://www.huaweicloud.com/declaration/statement.html"
            >法律声明</a
          >
          <span>|</span>
          <a href="https://www.huaweicloud.com/declaration/sa_prp.html"
            >隐私政策</a
          >
        </div>
      </div>
      <div id="record">
        <i class="i-emblem"></i>
        <i class="i-badge"></i>
        <a
          href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32011402010008"
          >苏公网安备 32011402010008号</a
        >
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
footer {
  height: 100px;
  background: #f3f3f3;

  .content,
  #side {
    display: flex;
    justify-content: space-between;
  }

  .content {
    flex-direction: column;
    padding-top: 35px;
  }

  #side__copyright * {
    margin-right: 10px;
  }

  #record {
    font-size: 12px;
    line-height: 30px;
  }
}

.i {
  &-emblem {
    background: $icon__emblem;
  }
  &-badge {
    background: $icon__badge;
  }
}
</style>
