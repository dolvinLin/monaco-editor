<template>
  <div ref="MonacoEditor" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
/**
 * 使用 monaco-editor
 * Detail: https://github.com/microsoft/monaco-editor#readme
 */
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

export default {
  name: 'MonacoEditor',
  model: { prop: 'value', event: 'oninput' },
  props: {
    value: { type: String, default: '' },
    editorOptions: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return { instance: null }
  },
  mounted() {
    this.initMonacoEditor()
  },
  methods: {
    initMonacoEditor() {
      const vm = this
      this.instance = monaco.editor.create(this.$refs.MonacoEditor, {
        value: vm.value,
        language: vm.editorOptions?.language ?? 'json',
        theme: vm.editorOptions?.theme ?? 'vs-dark',
        ...vm.editorOptions
      })
      vm.$emit('onMounted', vm.instance)
      vm.instance.onDidChangeModelContent(() => {
        const newValue = vm.instance.getValue()
        vm.$emit('oninput', newValue)
      })
    }
  }
}
</script>

<style scoped>
#MonacoEditor {
  text-align: left;
  height: inherit;
}
</style>
