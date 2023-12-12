export function timing() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor // Use PropertyDescriptor instead of PropertyDecorator
  ) {
    const originalMethod = descriptor.value; // Access value property of descriptor

    descriptor.value = async function (...args: any[]) {
      const startTime = performance.now(); // Measure start time
      const result = await originalMethod.apply(this, args); // Execute the original method
      const endTime = performance.now(); // Measure end time

      console.log(`Execution time for ${propertyKey}: ${endTime - startTime} milliseconds`);
      return result; // Return the result of the original method
    };
  };
}
