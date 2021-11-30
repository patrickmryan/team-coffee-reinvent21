const Intro = ({ next }: any) => {
  return (
    <div className="text-3xl leading-relaxed text-center">
      More power from the sun hits the Earth in a single hour than humanity uses
      in an entire year.
      <button
        className="mt-12 border-2 border-white px-7 py-1 rounded-xl hover:bg-white hover:bg-opacity-20"
        onClick={next}
      >
        Get started
      </button>
    </div>
  );
};

export default Intro;
