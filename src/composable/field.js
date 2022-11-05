import { ref, reactive, watch } from "vue";

export function useField(field) {
  const valid = ref(true);
  const value = ref(field.value);
  const touched = ref(false);
  const errors = reactive({});

  const reassign = (val) => {
    Object.keys(field.validators ?? {}).map((name) => {
      const isValid = field.validators[name](val);
      errors[name] = !isValid;
      valid.value = isValid;
    });
  };

  watch(value, reassign, { immediate: true });

  return { value, valid, errors, touched, blur: () => (touched.value = true) };
}
