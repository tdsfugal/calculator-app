// The react buttons push events to the calculator via callbacks created in this factory
export default function calculate(input) {
  return () => {
    console.log(`Clicked Button ${input}`);
  };
}
