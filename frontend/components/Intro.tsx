const Intro = ({ next }: any) => {
  return (
    <div className="text-3xl leading-relaxed text-center">
      <p>
        More power from the sun hits the Earth in a single hour than humanity
        uses in an entire year.
      </p>
      <img className="p-4" src="/PV-space-demand.jpg" />
      <p className="text-xl">
        Just a small percentage of the earth covered with solar could provide
        the entire population with energy.
      </p>
      <p className="text-xl mt-4">
        We understand solar panel efficiency greatly varies depending on where
        you live - so we&apos;re using data from{" "}
        <a
          href="https://registry.opendata.aws/nrel-pds-nsrdb/"
          target="_blank"
          className="underline hover:bold"
          rel="noreferrer"
        >
          NREL National Solar Radiation Database
        </a>{" "}
        to calculate a concrete estimate on potential savings - both CO2
        emissions as well as $$$.
      </p>{" "}
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
