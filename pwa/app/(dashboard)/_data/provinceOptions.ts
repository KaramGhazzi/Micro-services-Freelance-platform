type LocationOption = {
  label: string;
  items?: Province[];
};

export enum Province {
  DRENTE = 'nl_DR',
  FRIESLAND = 'nl_FR',
  FLEVOLAND = 'nl_FL',
  GELDERLAND = 'nl_GE',
  GRONINGEN = 'nl_GR',
  LIMBURG_NL = 'nl_LI',
  NOORD_BRABANT = 'nl_NB',
  NOORD_HOLLAND = 'nl_NH',
  OVERIJSSEL = 'nl_OV',
  UTRECHT = 'nl_UT',
  ZEELAND = 'nl_ZE',
  ZUID_HOLLAND = 'nl_ZH',

  ANTWERPEN = 'be_B1',
  BRUSSEL = 'be_BB',
  HENEGOUWEN = 'be_B7',
  LIMBURG_BE = 'be_B2',
  LUIK = 'be_B8',
  LUXEMBURG = 'be_B9',
  NAMEN = 'be_BA',
  OOST_VLAANDEREN = 'be_B3',
  VLAAMS_BRABANT = 'be_B4',
  WAALS_BRABANT = 'be_B6',
  WEST_BRABANT = 'be_B5',
}
const locationsOptions: LocationOption[] = [
  {
    label: 'Nederland',
    items: [
      Province.DRENTE,
      Province.FRIESLAND,
      Province.FLEVOLAND,
      Province.GELDERLAND,
      Province.GRONINGEN,
      Province.LIMBURG_NL,
      Province.NOORD_BRABANT,
      Province.NOORD_HOLLAND,
      Province.OVERIJSSEL,
      Province.UTRECHT,
      Province.ZEELAND,
      Province.ZUID_HOLLAND,
    ],
  },
  {
    label: 'Belgie',
    items: [
      Province.ANTWERPEN,
      Province.BRUSSEL,
      Province.HENEGOUWEN,
      Province.LIMBURG_BE,
      Province.LUIK,
      Province.LUXEMBURG,
      Province.NAMEN,
      Province.OOST_VLAANDEREN,
      Province.VLAAMS_BRABANT,
      Province.WAALS_BRABANT,
      Province.WEST_BRABANT,
    ],
  },
  {
    label: 'onLocation',
  },
];

export default locationsOptions;
