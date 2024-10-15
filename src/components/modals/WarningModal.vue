<template>
  <div class="modal-overlay" @click.self="handleCancel">
    <div class="modal">
      <h2>Warning</h2>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button @click="handleCancel">Cancel</button>
        <button @click="handleConfirm">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps} from 'vue';
import type {IWeatherResponse} from "@/models";

const props = defineProps<{
  cityToBeDeleted: IWeatherResponse | null;
}>();

const emit = defineEmits(['cancelDelete', 'confirmDelete']);

const handleCancel = () => {
  emit('cancelDelete');
};

const handleConfirm = () => {
  if (props.cityToBeDeleted) {
    emit('confirmDelete', props.cityToBeDeleted.id);
  }
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
