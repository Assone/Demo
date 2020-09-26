<template>
  <div class="view-course">
    <Header :title="title" :description="description" />
    <Section>
      <x-tab :list="tabs" @click="switchOption($event, true)"></x-tab>
      <div class="tags">
        <x-tag @click.native="switchOption(-1)">全部</x-tag>
        <x-tag
          v-for="(tag, index) in tags"
          :key="tag"
          @click.native="switchOption(index)"
          >{{ tag }}</x-tag
        >
      </div>
      <div class="course-container">
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

  @Watch('kind')
  updateDate(path: string) {
    this.$api
      .get<{ title: string; description: string; course: []; tabs: [] }>(
        `/api/${path}`
      )
      .then(({ title, description, course, tabs }) => {
        this.title = title;
        this.description = description;
        this.data = course;
        this.map = new Map(tabs);
      });
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

  switchOption(index: number, isTab: boolean) {
    isTab ? (this.currentTab = index) : (this.currentTag = index);
  }

  created() {
    this.updateDate(this.kind);
  }
}
</script>

<style lang="scss" scoped></style>
