<template>
  <div class="view-course">
    <Header
      :title="title"
      :description="description"
      :offsetY="offsetY"
      :color="isWhite"
    />
    <Section>
      <x-tab :list="tabs" @click="switchOption($event, true)"></x-tab>
      <div class="tags">
        <x-tag
          @click.native="switchOption(-1)"
          :class="{ isActive: currentTag === -1 }"
          >全部</x-tag
        >
        <x-tag
          :class="{ isActive: currentTag === index }"
          v-for="(tag, index) in tags"
          :key="tag"
          @click.native="switchOption(index)"
          >{{ tag }}</x-tag
        >
      </div>
      <div class="course-container" :class="sourceClass">
        <Card v-for="course in content" :key="course.href" v-bind="course" />
      </div>
    </Section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import Header from '@/components/HeaderCourse.vue';
import Section from '@/layout/Section.vue';
import XTab from '@/components/common/Tab.vue';
import XTag from '@/components/common/Tag.vue';
import Card from '@/components/Card.vue';

@Component({
  components: {
    Header,
    Section,
    XTab,
    XTag,
    Card,
  },
})
export default class Course extends Vue {
  @Prop({ type: String }) kind!: string;

  map = new Map();
  title = '';
  description = '';
  data = [];
  currentTab = 0;
  currentTag = -1;
  offsetY = 0;
  isWhite = false;

  @Watch('kind')
  updateDate(path: string) {
    this.$api
      .get<{
        title: string;
        description: string;
        course: [];
        tabs: [];
        offsetY: number;
        color: boolean;
        notRepeat: boolean;
      }>(`/api/${path}`)
      .then(
        ({ title, description, course, tabs, offsetY, color, notRepeat }) => {
          this.title = title;
          this.description = description;
          this.data = course;
          this.map = new Map(tabs);
          this.offsetY = -offsetY;
          this.isWhite = color;
          notRepeat ||
            this.data.forEach((item, index) => (item.offsetYIndex = index));
        }
      );
  }

  get tabs() {
    return [...this.map.keys()];
  }

  get tags() {
    return this.map.get(this.tabs[this.currentTab]);
  }

  get tab() {
    return this.tabs[this.currentTab];
  }

  get tag() {
    return this.currentTag === -1 ? undefined : this.tags[this.currentTag];
  }

  get content() {
    return this.data.filter(course =>
      course.tab.includes(this.tab) && this.tag === undefined
        ? course
        : course.tag.includes(this.tag) && course
    );
  }

  get sourceClass() {
    let sourceName = '';

    switch (this.tab) {
      case '热门课程':
      case '热门活动':
        sourceName = 'sprite__popular';
        break;
      case '云课程':
        sourceName = 'sprite__cloud-course';
        break;
      case '角色系列课程':
        sourceName = 'sprite__role-series-course';
        break;
      case '热门内容':
      case '前沿培训':
        sourceName = 'sprite__popular-content';
        break;
      case '微认证':
        sourceName = 'sprite__micro-certification';
        break;
      case '热门实验':
      case '在线实验':
        sourceName = 'sprite__online-experiment';
        break;
      // not default
    }

    return sourceName;
  }

  switchOption(index: number, isTab: boolean) {
    isTab ? (this.currentTab = index) : (this.currentTag = index);
  }

  created() {
    this.updateDate(this.kind);
  }
}
</script>

<style lang="scss" scoped>
.course-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
}

.section {
  margin-top: 25px;
}

.tags {
  margin: {
    top: 20px;
    bottom: 20px;
  }

  * {
    margin-right: 10px;
  }
}

.sprite {
  &__popular ::v-deep .card__cover {
    background-image: $sprite__popular;
  }
  &__cloud-course ::v-deep .card__cover {
    background-image: $sprite__cloud-course;
  }
  &__role-series-course ::v-deep .card__cover {
    background-image: $sprite__role-series-course;
  }
  &__popular-content ::v-deep .card__cover {
    background-image: $sprite__popular-content;
  }
  &__micro-certification ::v-deep .card__cover {
    background-image: $sprite__micro-certification;
  }
  &__online-experiment ::v-deep .card__cover {
    background-image: $sprite__online-experiment;
  }
}
</style>
