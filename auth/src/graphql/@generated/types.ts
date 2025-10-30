export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  join__FieldSet: { input: any; output: any; }
  link__Import: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  _count: AddressCount;
  addressLine1: Scalars['String']['output'];
  addressLine2?: Maybe<Scalars['String']['output']>;
  billingCompanies?: Maybe<Array<Company>>;
  city: Scalars['String']['output'];
  companies?: Maybe<Array<Company>>;
  countryCode?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  postalCode: Scalars['String']['output'];
};

export type AddressAvgAggregate = {
  __typename?: 'AddressAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type AddressCount = {
  __typename?: 'AddressCount';
  billingCompanies: Scalars['Int']['output'];
  companies: Scalars['Int']['output'];
};

export type AddressCountAggregate = {
  __typename?: 'AddressCountAggregate';
  _all: Scalars['Int']['output'];
  addressLine1: Scalars['Int']['output'];
  addressLine2: Scalars['Int']['output'];
  city: Scalars['Int']['output'];
  countryCode: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  postalCode: Scalars['Int']['output'];
};

export type AddressCreateNestedOneWithoutBillingCompaniesInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutBillingCompaniesInput>;
  create?: InputMaybe<AddressCreateWithoutBillingCompaniesInput>;
};

export type AddressCreateNestedOneWithoutCompaniesInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutCompaniesInput>;
  create?: InputMaybe<AddressCreateWithoutCompaniesInput>;
};

export type AddressCreateOrConnectWithoutBillingCompaniesInput = {
  create: AddressCreateWithoutBillingCompaniesInput;
  where: AddressWhereUniqueInput;
};

export type AddressCreateOrConnectWithoutCompaniesInput = {
  create: AddressCreateWithoutCompaniesInput;
  where: AddressWhereUniqueInput;
};

export type AddressCreateWithoutBillingCompaniesInput = {
  addressLine1: Scalars['String']['input'];
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  companies?: InputMaybe<CompanyCreateNestedManyWithoutAddressInput>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode: Scalars['String']['input'];
};

export type AddressCreateWithoutCompaniesInput = {
  addressLine1: Scalars['String']['input'];
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  billingCompanies?: InputMaybe<CompanyCreateNestedManyWithoutBillingAddressInput>;
  city: Scalars['String']['input'];
  countryCode?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode: Scalars['String']['input'];
};

export type AddressMaxAggregate = {
  __typename?: 'AddressMaxAggregate';
  addressLine1?: Maybe<Scalars['String']['output']>;
  addressLine2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
};

export type AddressMinAggregate = {
  __typename?: 'AddressMinAggregate';
  addressLine1?: Maybe<Scalars['String']['output']>;
  addressLine2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
};

export type AddressNullableRelationFilter = {
  is?: InputMaybe<AddressWhereInput>;
  isNot?: InputMaybe<AddressWhereInput>;
};

export type AddressOrderByWithRelationInput = {
  addressLine1?: InputMaybe<SortOrder>;
  addressLine2?: InputMaybe<SortOrderInput>;
  billingCompanies?: InputMaybe<CompanyOrderByRelationAggregateInput>;
  city?: InputMaybe<SortOrder>;
  companies?: InputMaybe<CompanyOrderByRelationAggregateInput>;
  countryCode?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrderInput>;
  postalCode?: InputMaybe<SortOrder>;
};

export type AddressSumAggregate = {
  __typename?: 'AddressSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type AddressUpdateOneWithoutBillingCompaniesNestedInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutBillingCompaniesInput>;
  create?: InputMaybe<AddressCreateWithoutBillingCompaniesInput>;
  delete?: InputMaybe<AddressWhereInput>;
  disconnect?: InputMaybe<AddressWhereInput>;
  update?: InputMaybe<AddressUpdateToOneWithWhereWithoutBillingCompaniesInput>;
  upsert?: InputMaybe<AddressUpsertWithoutBillingCompaniesInput>;
};

export type AddressUpdateOneWithoutCompaniesNestedInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutCompaniesInput>;
  create?: InputMaybe<AddressCreateWithoutCompaniesInput>;
  delete?: InputMaybe<AddressWhereInput>;
  disconnect?: InputMaybe<AddressWhereInput>;
  update?: InputMaybe<AddressUpdateToOneWithWhereWithoutCompaniesInput>;
  upsert?: InputMaybe<AddressUpsertWithoutCompaniesInput>;
};

export type AddressUpdateToOneWithWhereWithoutBillingCompaniesInput = {
  data: AddressUpdateWithoutBillingCompaniesInput;
  where?: InputMaybe<AddressWhereInput>;
};

export type AddressUpdateToOneWithWhereWithoutCompaniesInput = {
  data: AddressUpdateWithoutCompaniesInput;
  where?: InputMaybe<AddressWhereInput>;
};

export type AddressUpdateWithoutBillingCompaniesInput = {
  addressLine1?: InputMaybe<Scalars['String']['input']>;
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  companies?: InputMaybe<CompanyUpdateManyWithoutAddressNestedInput>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
};

export type AddressUpdateWithoutCompaniesInput = {
  addressLine1?: InputMaybe<Scalars['String']['input']>;
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  billingCompanies?: InputMaybe<CompanyUpdateManyWithoutBillingAddressNestedInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
};

export type AddressUpsertWithoutBillingCompaniesInput = {
  create: AddressCreateWithoutBillingCompaniesInput;
  update: AddressUpdateWithoutBillingCompaniesInput;
  where?: InputMaybe<AddressWhereInput>;
};

export type AddressUpsertWithoutCompaniesInput = {
  create: AddressCreateWithoutCompaniesInput;
  update: AddressUpdateWithoutCompaniesInput;
  where?: InputMaybe<AddressWhereInput>;
};

export type AddressWhereInput = {
  AND?: InputMaybe<Array<AddressWhereInput>>;
  NOT?: InputMaybe<Array<AddressWhereInput>>;
  OR?: InputMaybe<Array<AddressWhereInput>>;
  addressLine1?: InputMaybe<StringFilter>;
  addressLine2?: InputMaybe<StringNullableFilter>;
  billingCompanies?: InputMaybe<CompanyListRelationFilter>;
  city?: InputMaybe<StringFilter>;
  companies?: InputMaybe<CompanyListRelationFilter>;
  countryCode?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
  postalCode?: InputMaybe<StringFilter>;
};

export type AddressWhereUniqueInput = {
  AND?: InputMaybe<Array<AddressWhereInput>>;
  NOT?: InputMaybe<Array<AddressWhereInput>>;
  OR?: InputMaybe<Array<AddressWhereInput>>;
  addressLine1?: InputMaybe<StringFilter>;
  addressLine2?: InputMaybe<StringNullableFilter>;
  billingCompanies?: InputMaybe<CompanyListRelationFilter>;
  city?: InputMaybe<StringFilter>;
  companies?: InputMaybe<CompanyListRelationFilter>;
  countryCode?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<StringNullableFilter>;
  postalCode?: InputMaybe<StringFilter>;
};

export type ApiCompany = {
  __typename?: 'ApiCompany';
  _count: ApiCompanyCount;
  apiEmailRegex?: Maybe<Scalars['String']['output']>;
  apiUserCompanies?: Maybe<Array<ApiUserCompany>>;
  companyId: Scalars['Int']['output'];
  defaultOwnerId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
};

export type ApiCompanyAvgAggregate = {
  __typename?: 'ApiCompanyAvgAggregate';
  companyId?: Maybe<Scalars['Float']['output']>;
  defaultOwnerId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type ApiCompanyCount = {
  __typename?: 'ApiCompanyCount';
  apiUserCompanies: Scalars['Int']['output'];
};

export type ApiCompanyCountAggregate = {
  __typename?: 'ApiCompanyCountAggregate';
  _all: Scalars['Int']['output'];
  apiEmailRegex: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  defaultOwnerId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
};

export type ApiCompanyMaxAggregate = {
  __typename?: 'ApiCompanyMaxAggregate';
  apiEmailRegex?: Maybe<Scalars['String']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  defaultOwnerId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type ApiCompanyMinAggregate = {
  __typename?: 'ApiCompanyMinAggregate';
  apiEmailRegex?: Maybe<Scalars['String']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  defaultOwnerId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type ApiCompanySumAggregate = {
  __typename?: 'ApiCompanySumAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  defaultOwnerId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type ApiUserCompany = {
  __typename?: 'ApiUserCompany';
  apiCompany: ApiCompany;
  apiCompanyId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  userId: Scalars['Int']['output'];
  userKey: Scalars['String']['output'];
  usersCompaniesId: Scalars['Int']['output'];
};

export type ApiUserCompanyAvgAggregate = {
  __typename?: 'ApiUserCompanyAvgAggregate';
  apiCompanyId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
  usersCompaniesId?: Maybe<Scalars['Float']['output']>;
};

export type ApiUserCompanyCountAggregate = {
  __typename?: 'ApiUserCompanyCountAggregate';
  _all: Scalars['Int']['output'];
  apiCompanyId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  userKey: Scalars['Int']['output'];
  usersCompaniesId: Scalars['Int']['output'];
};

export type ApiUserCompanyMaxAggregate = {
  __typename?: 'ApiUserCompanyMaxAggregate';
  apiCompanyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
  userKey?: Maybe<Scalars['String']['output']>;
  usersCompaniesId?: Maybe<Scalars['Int']['output']>;
};

export type ApiUserCompanyMinAggregate = {
  __typename?: 'ApiUserCompanyMinAggregate';
  apiCompanyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
  userKey?: Maybe<Scalars['String']['output']>;
  usersCompaniesId?: Maybe<Scalars['Int']['output']>;
};

export type ApiUserCompanySumAggregate = {
  __typename?: 'ApiUserCompanySumAggregate';
  apiCompanyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
  usersCompaniesId?: Maybe<Scalars['Int']['output']>;
};

export type ApplicationProfile = {
  __typename?: 'ApplicationProfile';
  _count: ApplicationProfileCount;
  availability?: Maybe<Availability>;
  availableFrom?: Maybe<Scalars['DateTime']['output']>;
  availableHours?: Maybe<Scalars['Int']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  documents?: Maybe<Array<ApplicationProfileFile>>;
  expertises?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  ownerId: Scalars['Int']['output'];
  personalQualities?: Maybe<Scalars['String']['output']>;
  rateFrom?: Maybe<Scalars['Float']['output']>;
  rateTo?: Maybe<Scalars['Float']['output']>;
  rateType?: Maybe<RateType>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
};

export type ApplicationProfileAvgAggregate = {
  __typename?: 'ApplicationProfileAvgAggregate';
  availableHours?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  ownerId?: Maybe<Scalars['Float']['output']>;
  rateFrom?: Maybe<Scalars['Float']['output']>;
  rateTo?: Maybe<Scalars['Float']['output']>;
};

export type ApplicationProfileCount = {
  __typename?: 'ApplicationProfileCount';
  documents: Scalars['Int']['output'];
};

export type ApplicationProfileCountAggregate = {
  __typename?: 'ApplicationProfileCountAggregate';
  _all: Scalars['Int']['output'];
  availability: Scalars['Int']['output'];
  availableFrom: Scalars['Int']['output'];
  availableHours: Scalars['Int']['output'];
  background: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  deletedAt: Scalars['Int']['output'];
  expertises: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  ownerId: Scalars['Int']['output'];
  personalQualities: Scalars['Int']['output'];
  rateFrom: Scalars['Int']['output'];
  rateTo: Scalars['Int']['output'];
  rateType: Scalars['Int']['output'];
  title: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type ApplicationProfileCreateInput = {
  availability?: InputMaybe<Availability>;
  availableFrom?: InputMaybe<Scalars['DateTime']['input']>;
  availableHours?: InputMaybe<Scalars['Int']['input']>;
  background?: InputMaybe<Scalars['String']['input']>;
  documents?: InputMaybe<ApplicationProfileFileCreateNestedManyWithoutApplicationProfileInput>;
  expertises?: InputMaybe<Scalars['String']['input']>;
  personalQualities?: InputMaybe<Scalars['String']['input']>;
  rateFrom?: InputMaybe<Scalars['Float']['input']>;
  rateTo?: InputMaybe<Scalars['Float']['input']>;
  rateType?: InputMaybe<RateType>;
  title: Scalars['String']['input'];
};

export type ApplicationProfileFile = {
  __typename?: 'ApplicationProfileFile';
  applicationProfile: ApplicationProfile;
  applicationProfileId: Scalars['Int']['output'];
  file: File;
  fileId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
};

export type ApplicationProfileFileAvgAggregate = {
  __typename?: 'ApplicationProfileFileAvgAggregate';
  applicationProfileId?: Maybe<Scalars['Float']['output']>;
  fileId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type ApplicationProfileFileCountAggregate = {
  __typename?: 'ApplicationProfileFileCountAggregate';
  _all: Scalars['Int']['output'];
  applicationProfileId: Scalars['Int']['output'];
  fileId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
};

export type ApplicationProfileFileCreateManyApplicationProfileInput = {
  fileId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type ApplicationProfileFileCreateManyApplicationProfileInputEnvelope = {
  data: Array<ApplicationProfileFileCreateManyApplicationProfileInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ApplicationProfileFileCreateNestedManyWithoutApplicationProfileInput = {
  connect?: InputMaybe<Array<ApplicationProfileFileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ApplicationProfileFileCreateOrConnectWithoutApplicationProfileInput>>;
  create?: InputMaybe<Array<ApplicationProfileFileCreateWithoutApplicationProfileInput>>;
  createMany?: InputMaybe<ApplicationProfileFileCreateManyApplicationProfileInputEnvelope>;
};

export type ApplicationProfileFileCreateOrConnectWithoutApplicationProfileInput = {
  create: ApplicationProfileFileCreateWithoutApplicationProfileInput;
  where: ApplicationProfileFileWhereUniqueInput;
};

export type ApplicationProfileFileCreateWithoutApplicationProfileInput = {
  file: FileCreateNestedOneWithoutApplicationProfileFilesInput;
};

export type ApplicationProfileFileListRelationFilter = {
  every?: InputMaybe<ApplicationProfileFileWhereInput>;
  none?: InputMaybe<ApplicationProfileFileWhereInput>;
  some?: InputMaybe<ApplicationProfileFileWhereInput>;
};

export type ApplicationProfileFileMaxAggregate = {
  __typename?: 'ApplicationProfileFileMaxAggregate';
  applicationProfileId?: Maybe<Scalars['Int']['output']>;
  fileId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type ApplicationProfileFileMinAggregate = {
  __typename?: 'ApplicationProfileFileMinAggregate';
  applicationProfileId?: Maybe<Scalars['Int']['output']>;
  fileId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type ApplicationProfileFileOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ApplicationProfileFileScalarWhereInput = {
  AND?: InputMaybe<Array<ApplicationProfileFileScalarWhereInput>>;
  NOT?: InputMaybe<Array<ApplicationProfileFileScalarWhereInput>>;
  OR?: InputMaybe<Array<ApplicationProfileFileScalarWhereInput>>;
  applicationProfileId?: InputMaybe<IntFilter>;
  fileId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
};

export type ApplicationProfileFileSumAggregate = {
  __typename?: 'ApplicationProfileFileSumAggregate';
  applicationProfileId?: Maybe<Scalars['Int']['output']>;
  fileId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type ApplicationProfileFileUncheckedUpdateManyWithoutApplicationProfileInput = {
  fileId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type ApplicationProfileFileUpdateManyWithWhereWithoutApplicationProfileInput = {
  data: ApplicationProfileFileUncheckedUpdateManyWithoutApplicationProfileInput;
  where: ApplicationProfileFileScalarWhereInput;
};

export type ApplicationProfileFileUpdateManyWithoutApplicationProfileNestedInput = {
  connect?: InputMaybe<Array<ApplicationProfileFileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ApplicationProfileFileCreateOrConnectWithoutApplicationProfileInput>>;
  create?: InputMaybe<Array<ApplicationProfileFileCreateWithoutApplicationProfileInput>>;
  createMany?: InputMaybe<ApplicationProfileFileCreateManyApplicationProfileInputEnvelope>;
  delete?: InputMaybe<Array<ApplicationProfileFileWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ApplicationProfileFileScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ApplicationProfileFileWhereUniqueInput>>;
  set?: InputMaybe<Array<ApplicationProfileFileWhereUniqueInput>>;
  update?: InputMaybe<Array<ApplicationProfileFileUpdateWithWhereUniqueWithoutApplicationProfileInput>>;
  updateMany?: InputMaybe<Array<ApplicationProfileFileUpdateManyWithWhereWithoutApplicationProfileInput>>;
  upsert?: InputMaybe<Array<ApplicationProfileFileUpsertWithWhereUniqueWithoutApplicationProfileInput>>;
};

export type ApplicationProfileFileUpdateWithWhereUniqueWithoutApplicationProfileInput = {
  data: ApplicationProfileFileUpdateWithoutApplicationProfileInput;
  where: ApplicationProfileFileWhereUniqueInput;
};

export type ApplicationProfileFileUpdateWithoutApplicationProfileInput = {
  file?: InputMaybe<FileUpdateOneRequiredWithoutApplicationProfileFilesNestedInput>;
};

export type ApplicationProfileFileUpsertWithWhereUniqueWithoutApplicationProfileInput = {
  create: ApplicationProfileFileCreateWithoutApplicationProfileInput;
  update: ApplicationProfileFileUpdateWithoutApplicationProfileInput;
  where: ApplicationProfileFileWhereUniqueInput;
};

export type ApplicationProfileFileWhereInput = {
  AND?: InputMaybe<Array<ApplicationProfileFileWhereInput>>;
  NOT?: InputMaybe<Array<ApplicationProfileFileWhereInput>>;
  OR?: InputMaybe<Array<ApplicationProfileFileWhereInput>>;
  applicationProfile?: InputMaybe<ApplicationProfileRelationFilter>;
  applicationProfileId?: InputMaybe<IntFilter>;
  file?: InputMaybe<FileRelationFilter>;
  fileId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
};

export type ApplicationProfileFileWhereUniqueInput = {
  AND?: InputMaybe<Array<ApplicationProfileFileWhereInput>>;
  NOT?: InputMaybe<Array<ApplicationProfileFileWhereInput>>;
  OR?: InputMaybe<Array<ApplicationProfileFileWhereInput>>;
  applicationProfile?: InputMaybe<ApplicationProfileRelationFilter>;
  applicationProfileId?: InputMaybe<IntFilter>;
  file?: InputMaybe<FileRelationFilter>;
  fileId?: InputMaybe<IntFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type ApplicationProfileMaxAggregate = {
  __typename?: 'ApplicationProfileMaxAggregate';
  availability?: Maybe<Availability>;
  availableFrom?: Maybe<Scalars['DateTime']['output']>;
  availableHours?: Maybe<Scalars['Int']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  expertises?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  ownerId?: Maybe<Scalars['Int']['output']>;
  personalQualities?: Maybe<Scalars['String']['output']>;
  rateFrom?: Maybe<Scalars['Float']['output']>;
  rateTo?: Maybe<Scalars['Float']['output']>;
  rateType?: Maybe<RateType>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type ApplicationProfileMinAggregate = {
  __typename?: 'ApplicationProfileMinAggregate';
  availability?: Maybe<Availability>;
  availableFrom?: Maybe<Scalars['DateTime']['output']>;
  availableHours?: Maybe<Scalars['Int']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  expertises?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  ownerId?: Maybe<Scalars['Int']['output']>;
  personalQualities?: Maybe<Scalars['String']['output']>;
  rateFrom?: Maybe<Scalars['Float']['output']>;
  rateTo?: Maybe<Scalars['Float']['output']>;
  rateType?: Maybe<RateType>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type ApplicationProfileOrderByWithRelationInput = {
  availability?: InputMaybe<SortOrderInput>;
  availableFrom?: InputMaybe<SortOrderInput>;
  availableHours?: InputMaybe<SortOrderInput>;
  background?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  deletedAt?: InputMaybe<SortOrderInput>;
  documents?: InputMaybe<ApplicationProfileFileOrderByRelationAggregateInput>;
  expertises?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  ownerId?: InputMaybe<SortOrder>;
  personalQualities?: InputMaybe<SortOrderInput>;
  rateFrom?: InputMaybe<SortOrderInput>;
  rateTo?: InputMaybe<SortOrderInput>;
  rateType?: InputMaybe<SortOrderInput>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type ApplicationProfileRelationFilter = {
  is?: InputMaybe<ApplicationProfileWhereInput>;
  isNot?: InputMaybe<ApplicationProfileWhereInput>;
};

export enum ApplicationProfileScalarFieldEnum {
  Availability = 'availability',
  AvailableFrom = 'availableFrom',
  AvailableHours = 'availableHours',
  Background = 'background',
  CreatedAt = 'createdAt',
  DeletedAt = 'deletedAt',
  Expertises = 'expertises',
  Id = 'id',
  OwnerId = 'ownerId',
  PersonalQualities = 'personalQualities',
  RateFrom = 'rateFrom',
  RateTo = 'rateTo',
  RateType = 'rateType',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  Uuid = 'uuid'
}

export type ApplicationProfileSumAggregate = {
  __typename?: 'ApplicationProfileSumAggregate';
  availableHours?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  ownerId?: Maybe<Scalars['Int']['output']>;
  rateFrom?: Maybe<Scalars['Float']['output']>;
  rateTo?: Maybe<Scalars['Float']['output']>;
};

export type ApplicationProfileUpdateInput = {
  availability?: InputMaybe<Availability>;
  availableFrom?: InputMaybe<Scalars['DateTime']['input']>;
  availableHours?: InputMaybe<Scalars['Int']['input']>;
  background?: InputMaybe<Scalars['String']['input']>;
  documents?: InputMaybe<ApplicationProfileFileUpdateManyWithoutApplicationProfileNestedInput>;
  expertises?: InputMaybe<Scalars['String']['input']>;
  personalQualities?: InputMaybe<Scalars['String']['input']>;
  rateFrom?: InputMaybe<Scalars['Float']['input']>;
  rateTo?: InputMaybe<Scalars['Float']['input']>;
  rateType?: InputMaybe<RateType>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ApplicationProfileWhereInput = {
  AND?: InputMaybe<Array<ApplicationProfileWhereInput>>;
  NOT?: InputMaybe<Array<ApplicationProfileWhereInput>>;
  OR?: InputMaybe<Array<ApplicationProfileWhereInput>>;
  availability?: InputMaybe<EnumAvailabilityNullableFilter>;
  availableFrom?: InputMaybe<DateTimeNullableFilter>;
  availableHours?: InputMaybe<IntNullableFilter>;
  background?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deletedAt?: InputMaybe<DateTimeNullableFilter>;
  documents?: InputMaybe<ApplicationProfileFileListRelationFilter>;
  expertises?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  ownerId?: InputMaybe<IntFilter>;
  personalQualities?: InputMaybe<StringNullableFilter>;
  rateFrom?: InputMaybe<FloatNullableFilter>;
  rateTo?: InputMaybe<FloatNullableFilter>;
  rateType?: InputMaybe<EnumRateTypeNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type ApplicationProfileWhereUniqueInput = {
  AND?: InputMaybe<Array<ApplicationProfileWhereInput>>;
  NOT?: InputMaybe<Array<ApplicationProfileWhereInput>>;
  OR?: InputMaybe<Array<ApplicationProfileWhereInput>>;
  availability?: InputMaybe<EnumAvailabilityNullableFilter>;
  availableFrom?: InputMaybe<DateTimeNullableFilter>;
  availableHours?: InputMaybe<IntNullableFilter>;
  background?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deletedAt?: InputMaybe<DateTimeNullableFilter>;
  documents?: InputMaybe<ApplicationProfileFileListRelationFilter>;
  expertises?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  ownerId?: InputMaybe<IntFilter>;
  personalQualities?: InputMaybe<StringNullableFilter>;
  rateFrom?: InputMaybe<FloatNullableFilter>;
  rateTo?: InputMaybe<FloatNullableFilter>;
  rateType?: InputMaybe<EnumRateTypeNullableFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type Assignment = {
  __typename?: 'Assignment';
  _count: AssignmentCount;
  applicationDeadlineDate?: Maybe<Scalars['DateTime']['output']>;
  applyEnabled: Scalars['Boolean']['output'];
  assignmentApplications?: Maybe<Array<AssignmentApplication>>;
  assignmentRead?: Maybe<Array<AssignmentRead>>;
  commentsCount: Scalars['Int']['output'];
  company: Company;
  companyId: Scalars['Int']['output'];
  contractType?: Maybe<ContractType>;
  createdAt: Scalars['DateTime']['output'];
  currentStatus: Status;
  customerRelation?: Maybe<CustomerRelation>;
  customerRelationCompany?: Maybe<Scalars['String']['output']>;
  customerRelationCompanyVisible: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  descriptionIsVisible: Scalars['Boolean']['output'];
  descriptionIsVisibleFrom?: Maybe<Scalars['DateTime']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  durationExtendable: Scalars['Boolean']['output'];
  durationType?: Maybe<DurationType>;
  expertises?: Maybe<Array<AssignmentExpertise>>;
  externalCode?: Maybe<Scalars['String']['output']>;
  hideInDescription: Scalars['Boolean']['output'];
  hoursFrom?: Maybe<Scalars['Float']['output']>;
  hoursTo?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  isFavorite: Scalars['Boolean']['output'];
  isRandomlyVisible: Scalars['Boolean']['output'];
  isRead: Scalars['Boolean']['output'];
  notVisibleReason?: Maybe<AssignmentNotVisibleReason>;
  onLocation?: Maybe<OnLocation>;
  owner: User;
  ownerId: Scalars['Int']['output'];
  place?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  publishAt?: Maybe<Scalars['DateTime']['output']>;
  publishUntil?: Maybe<Scalars['DateTime']['output']>;
  rateFrom?: Maybe<Scalars['Float']['output']>;
  rateTo?: Maybe<Scalars['Float']['output']>;
  rateType?: Maybe<RateType>;
  replied: Scalars['Boolean']['output'];
  reviewEnabled: Scalars['Boolean']['output'];
  source: AssignmentSource;
  startAsap: Scalars['Boolean']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<AssignmentStatus>;
  statusHistory: Array<Status>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<AssignmentType>;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
  viewsCount: Scalars['Int']['output'];
};

export type AssignmentApplication = {
  __typename?: 'AssignmentApplication';
  _count: AssignmentApplicationCount;
  assignment: Assignment;
  assignmentId: Scalars['Int']['output'];
  availability?: Maybe<Availability>;
  availableFrom?: Maybe<Scalars['DateTime']['output']>;
  availableHours?: Maybe<Scalars['Int']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  company: Company;
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currentStatus: Status;
  documents?: Maybe<Array<AssignmentApplicationFile>>;
  email?: Maybe<Scalars['String']['output']>;
  expertises?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  linkedInURL?: Maybe<Scalars['String']['output']>;
  motivation?: Maybe<Scalars['String']['output']>;
  owner: User;
  ownerId: Scalars['Int']['output'];
  personalQualities?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  rateFrom?: Maybe<Scalars['Float']['output']>;
  rateTo?: Maybe<Scalars['Float']['output']>;
  rateType?: Maybe<RateType>;
  status: AssignmentApplicationStatus;
  statusHistory: Array<Status>;
  updatedAt: Scalars['DateTime']['output'];
  uuid: Scalars['String']['output'];
  websiteURL?: Maybe<Scalars['String']['output']>;
};

export type AssignmentApplicationAvgAggregate = {
  __typename?: 'AssignmentApplicationAvgAggregate';
  assignmentId?: Maybe<Scalars['Float']['output']>;
  availableHours?: Maybe<Scalars['Float']['output']>;
  companyId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  ownerId?: Maybe<Scalars['Float']['output']>;
  rateFrom?: Maybe<Scalars['Float']['output']>;
  rateTo?: Maybe<Scalars['Float']['output']>;
};

export type AssignmentApplicationCount = {
  __typename?: 'AssignmentApplicationCount';
  assignmentApplicationRead: Scalars['Int']['output'];
  documents: Scalars['Int']['output'];
};

export type AssignmentApplicationCountAggregate = {
  __typename?: 'AssignmentApplicationCountAggregate';
  _all: Scalars['Int']['output'];
  assignmentId: Scalars['Int']['output'];
  availability: Scalars['Int']['output'];
  availableFrom: Scalars['Int']['output'];
  availableHours: Scalars['Int']['output'];
  background: Scalars['Int']['output'];
  city: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  email: Scalars['Int']['output'];
  expertises: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  linkedInURL: Scalars['Int']['output'];
  motivation: Scalars['Int']['output'];
  ownerId: Scalars['Int']['output'];
  personalQualities: Scalars['Int']['output'];
  phoneNumber: Scalars['Int']['output'];
  rateFrom: Scalars['Int']['output'];
  rateTo: Scalars['Int']['output'];
  rateType: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
  websiteURL: Scalars['Int']['output'];
};

export type AssignmentApplicationFile = {
  __typename?: 'AssignmentApplicationFile';
  assignmentApplication: AssignmentApplication;
  assignmentApplicationId: Scalars['Int']['output'];
  file: File;
  fileId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
};

export type AssignmentApplicationFileAvgAggregate = {
  __typename?: 'AssignmentApplicationFileAvgAggregate';
  assignmentApplicationId?: Maybe<Scalars['Float']['output']>;
  fileId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type AssignmentApplicationFileCountAggregate = {
  __typename?: 'AssignmentApplicationFileCountAggregate';
  _all: Scalars['Int']['output'];
  assignmentApplicationId: Scalars['Int']['output'];
  fileId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
};

export type AssignmentApplicationFileCreateManyAssignmentApplicationInput = {
  fileId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type AssignmentApplicationFileCreateManyAssignmentApplicationInputEnvelope = {
  data: Array<AssignmentApplicationFileCreateManyAssignmentApplicationInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssignmentApplicationFileCreateOrConnectWithoutAssignmentApplicationInput = {
  create: AssignmentApplicationFileCreateWithoutAssignmentApplicationInput;
  where: AssignmentApplicationFileWhereUniqueInput;
};

export type AssignmentApplicationFileCreateWithoutAssignmentApplicationInput = {
  file: FileCreateNestedOneWithoutAssignmentApplicationsInput;
};

export type AssignmentApplicationFileListRelationFilter = {
  every?: InputMaybe<AssignmentApplicationFileWhereInput>;
  none?: InputMaybe<AssignmentApplicationFileWhereInput>;
  some?: InputMaybe<AssignmentApplicationFileWhereInput>;
};

export type AssignmentApplicationFileMaxAggregate = {
  __typename?: 'AssignmentApplicationFileMaxAggregate';
  assignmentApplicationId?: Maybe<Scalars['Int']['output']>;
  fileId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type AssignmentApplicationFileMinAggregate = {
  __typename?: 'AssignmentApplicationFileMinAggregate';
  assignmentApplicationId?: Maybe<Scalars['Int']['output']>;
  fileId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type AssignmentApplicationFileOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AssignmentApplicationFileScalarWhereInput = {
  AND?: InputMaybe<Array<AssignmentApplicationFileScalarWhereInput>>;
  NOT?: InputMaybe<Array<AssignmentApplicationFileScalarWhereInput>>;
  OR?: InputMaybe<Array<AssignmentApplicationFileScalarWhereInput>>;
  assignmentApplicationId?: InputMaybe<IntFilter>;
  fileId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
};

export type AssignmentApplicationFileSumAggregate = {
  __typename?: 'AssignmentApplicationFileSumAggregate';
  assignmentApplicationId?: Maybe<Scalars['Int']['output']>;
  fileId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type AssignmentApplicationFileUncheckedUpdateManyWithoutAssignmentApplicationInput = {
  fileId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type AssignmentApplicationFileUpdateManyWithWhereWithoutAssignmentApplicationInput = {
  data: AssignmentApplicationFileUncheckedUpdateManyWithoutAssignmentApplicationInput;
  where: AssignmentApplicationFileScalarWhereInput;
};

export type AssignmentApplicationFileUpdateManyWithoutAssignmentApplicationNestedInput = {
  connect?: InputMaybe<Array<AssignmentApplicationFileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssignmentApplicationFileCreateOrConnectWithoutAssignmentApplicationInput>>;
  create?: InputMaybe<Array<AssignmentApplicationFileCreateWithoutAssignmentApplicationInput>>;
  createMany?: InputMaybe<AssignmentApplicationFileCreateManyAssignmentApplicationInputEnvelope>;
  delete?: InputMaybe<Array<AssignmentApplicationFileWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AssignmentApplicationFileScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AssignmentApplicationFileWhereUniqueInput>>;
  set?: InputMaybe<Array<AssignmentApplicationFileWhereUniqueInput>>;
  update?: InputMaybe<Array<AssignmentApplicationFileUpdateWithWhereUniqueWithoutAssignmentApplicationInput>>;
  updateMany?: InputMaybe<Array<AssignmentApplicationFileUpdateManyWithWhereWithoutAssignmentApplicationInput>>;
  upsert?: InputMaybe<Array<AssignmentApplicationFileUpsertWithWhereUniqueWithoutAssignmentApplicationInput>>;
};

export type AssignmentApplicationFileUpdateWithWhereUniqueWithoutAssignmentApplicationInput = {
  data: AssignmentApplicationFileUpdateWithoutAssignmentApplicationInput;
  where: AssignmentApplicationFileWhereUniqueInput;
};

export type AssignmentApplicationFileUpdateWithoutAssignmentApplicationInput = {
  file?: InputMaybe<FileUpdateOneRequiredWithoutAssignmentApplicationsNestedInput>;
};

export type AssignmentApplicationFileUpsertWithWhereUniqueWithoutAssignmentApplicationInput = {
  create: AssignmentApplicationFileCreateWithoutAssignmentApplicationInput;
  update: AssignmentApplicationFileUpdateWithoutAssignmentApplicationInput;
  where: AssignmentApplicationFileWhereUniqueInput;
};

export type AssignmentApplicationFileWhereInput = {
  AND?: InputMaybe<Array<AssignmentApplicationFileWhereInput>>;
  NOT?: InputMaybe<Array<AssignmentApplicationFileWhereInput>>;
  OR?: InputMaybe<Array<AssignmentApplicationFileWhereInput>>;
  assignmentApplication?: InputMaybe<AssignmentApplicationRelationFilter>;
  assignmentApplicationId?: InputMaybe<IntFilter>;
  file?: InputMaybe<FileRelationFilter>;
  fileId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
};

export type AssignmentApplicationFileWhereUniqueInput = {
  AND?: InputMaybe<Array<AssignmentApplicationFileWhereInput>>;
  NOT?: InputMaybe<Array<AssignmentApplicationFileWhereInput>>;
  OR?: InputMaybe<Array<AssignmentApplicationFileWhereInput>>;
  assignmentApplication?: InputMaybe<AssignmentApplicationRelationFilter>;
  assignmentApplicationId?: InputMaybe<IntFilter>;
  file?: InputMaybe<FileRelationFilter>;
  fileId?: InputMaybe<IntFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type AssignmentApplicationMaxAggregate = {
  __typename?: 'AssignmentApplicationMaxAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  availability?: Maybe<Availability>;
  availableFrom?: Maybe<Scalars['DateTime']['output']>;
  availableHours?: Maybe<Scalars['Int']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  expertises?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  linkedInURL?: Maybe<Scalars['String']['output']>;
  motivation?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['Int']['output']>;
  personalQualities?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  rateFrom?: Maybe<Scalars['Float']['output']>;
  rateTo?: Maybe<Scalars['Float']['output']>;
  rateType?: Maybe<RateType>;
  status?: Maybe<AssignmentApplicationStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  websiteURL?: Maybe<Scalars['String']['output']>;
};

export type AssignmentApplicationMinAggregate = {
  __typename?: 'AssignmentApplicationMinAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  availability?: Maybe<Availability>;
  availableFrom?: Maybe<Scalars['DateTime']['output']>;
  availableHours?: Maybe<Scalars['Int']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  expertises?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  linkedInURL?: Maybe<Scalars['String']['output']>;
  motivation?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['Int']['output']>;
  personalQualities?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  rateFrom?: Maybe<Scalars['Float']['output']>;
  rateTo?: Maybe<Scalars['Float']['output']>;
  rateType?: Maybe<RateType>;
  status?: Maybe<AssignmentApplicationStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
  websiteURL?: Maybe<Scalars['String']['output']>;
};

export type AssignmentApplicationOrderByWithRelationInput = {
  assignment?: InputMaybe<AssignmentOrderByWithRelationInput>;
  assignmentId?: InputMaybe<SortOrder>;
  availability?: InputMaybe<SortOrderInput>;
  availableFrom?: InputMaybe<SortOrderInput>;
  availableHours?: InputMaybe<SortOrderInput>;
  background?: InputMaybe<SortOrderInput>;
  city?: InputMaybe<SortOrderInput>;
  companyId?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  documents?: InputMaybe<AssignmentApplicationFileOrderByRelationAggregateInput>;
  email?: InputMaybe<SortOrderInput>;
  expertises?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  linkedInURL?: InputMaybe<SortOrderInput>;
  motivation?: InputMaybe<SortOrderInput>;
  owner?: InputMaybe<UserOrderByWithRelationInput>;
  ownerId?: InputMaybe<SortOrder>;
  personalQualities?: InputMaybe<SortOrderInput>;
  phoneNumber?: InputMaybe<SortOrderInput>;
  rateFrom?: InputMaybe<SortOrderInput>;
  rateTo?: InputMaybe<SortOrderInput>;
  rateType?: InputMaybe<SortOrderInput>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
  websiteURL?: InputMaybe<SortOrderInput>;
};

export type AssignmentApplicationRead = {
  __typename?: 'AssignmentApplicationRead';
  assignmentApplication: AssignmentApplication;
  assignmentApplicationId: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  readAt: Scalars['DateTime']['output'];
  userId: Scalars['Int']['output'];
};

export type AssignmentApplicationReadAvgAggregate = {
  __typename?: 'AssignmentApplicationReadAvgAggregate';
  assignmentApplicationId?: Maybe<Scalars['Float']['output']>;
  companyId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type AssignmentApplicationReadCountAggregate = {
  __typename?: 'AssignmentApplicationReadCountAggregate';
  _all: Scalars['Int']['output'];
  assignmentApplicationId: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  readAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type AssignmentApplicationReadMaxAggregate = {
  __typename?: 'AssignmentApplicationReadMaxAggregate';
  assignmentApplicationId?: Maybe<Scalars['Int']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type AssignmentApplicationReadMinAggregate = {
  __typename?: 'AssignmentApplicationReadMinAggregate';
  assignmentApplicationId?: Maybe<Scalars['Int']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type AssignmentApplicationReadSumAggregate = {
  __typename?: 'AssignmentApplicationReadSumAggregate';
  assignmentApplicationId?: Maybe<Scalars['Int']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type AssignmentApplicationRelationFilter = {
  is?: InputMaybe<AssignmentApplicationWhereInput>;
  isNot?: InputMaybe<AssignmentApplicationWhereInput>;
};

export enum AssignmentApplicationScalarFieldEnum {
  AssignmentId = 'assignmentId',
  Availability = 'availability',
  AvailableFrom = 'availableFrom',
  AvailableHours = 'availableHours',
  Background = 'background',
  City = 'city',
  CompanyId = 'companyId',
  CreatedAt = 'createdAt',
  DeletedAt = 'deletedAt',
  Email = 'email',
  Expertises = 'expertises',
  Id = 'id',
  LinkedInUrl = 'linkedInURL',
  Motivation = 'motivation',
  OwnerId = 'ownerId',
  PersonalQualities = 'personalQualities',
  PhoneNumber = 'phoneNumber',
  RateFrom = 'rateFrom',
  RateTo = 'rateTo',
  RateType = 'rateType',
  Status = 'status',
  UpdatedAt = 'updatedAt',
  Uuid = 'uuid',
  WebsiteUrl = 'websiteURL'
}

export enum AssignmentApplicationStatus {
  Accepted = 'ACCEPTED',
  Concept = 'CONCEPT',
  Declined = 'DECLINED',
  New = 'NEW',
  Pending = 'PENDING',
  Proposed = 'PROPOSED',
  Question = 'QUESTION'
}

export type AssignmentApplicationSumAggregate = {
  __typename?: 'AssignmentApplicationSumAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  availableHours?: Maybe<Scalars['Int']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  ownerId?: Maybe<Scalars['Int']['output']>;
  rateFrom?: Maybe<Scalars['Float']['output']>;
  rateTo?: Maybe<Scalars['Float']['output']>;
};

export type AssignmentApplicationUpdateInput = {
  availability?: InputMaybe<Availability>;
  availableFrom?: InputMaybe<Scalars['DateTime']['input']>;
  availableHours?: InputMaybe<Scalars['Int']['input']>;
  background?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  documents?: InputMaybe<AssignmentApplicationFileUpdateManyWithoutAssignmentApplicationNestedInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  expertises?: InputMaybe<Scalars['String']['input']>;
  linkedInURL?: InputMaybe<Scalars['String']['input']>;
  motivation?: InputMaybe<Scalars['String']['input']>;
  personalQualities?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  rateFrom?: InputMaybe<Scalars['Float']['input']>;
  rateTo?: InputMaybe<Scalars['Float']['input']>;
  rateType?: InputMaybe<RateType>;
  websiteURL?: InputMaybe<Scalars['String']['input']>;
};

export type AssignmentApplicationWhereInput = {
  AND?: InputMaybe<Array<AssignmentApplicationWhereInput>>;
  NOT?: InputMaybe<Array<AssignmentApplicationWhereInput>>;
  OR?: InputMaybe<Array<AssignmentApplicationWhereInput>>;
  assignment?: InputMaybe<AssignmentRelationFilter>;
  assignmentId?: InputMaybe<IntFilter>;
  availability?: InputMaybe<EnumAvailabilityNullableFilter>;
  availableFrom?: InputMaybe<DateTimeNullableFilter>;
  availableHours?: InputMaybe<IntNullableFilter>;
  background?: InputMaybe<StringNullableFilter>;
  city?: InputMaybe<StringNullableFilter>;
  companyId?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  documents?: InputMaybe<AssignmentApplicationFileListRelationFilter>;
  email?: InputMaybe<StringNullableFilter>;
  expertises?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  linkedInURL?: InputMaybe<StringNullableFilter>;
  motivation?: InputMaybe<StringNullableFilter>;
  owner?: InputMaybe<UserRelationFilter>;
  ownerId?: InputMaybe<IntFilter>;
  personalQualities?: InputMaybe<StringNullableFilter>;
  phoneNumber?: InputMaybe<StringNullableFilter>;
  rateFrom?: InputMaybe<FloatNullableFilter>;
  rateTo?: InputMaybe<FloatNullableFilter>;
  rateType?: InputMaybe<EnumRateTypeNullableFilter>;
  status?: InputMaybe<EnumAssignmentApplicationStatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<StringFilter>;
  websiteURL?: InputMaybe<StringNullableFilter>;
};

export type AssignmentApplicationWhereUniqueInput = {
  AND?: InputMaybe<Array<AssignmentApplicationWhereInput>>;
  NOT?: InputMaybe<Array<AssignmentApplicationWhereInput>>;
  OR?: InputMaybe<Array<AssignmentApplicationWhereInput>>;
  assignment?: InputMaybe<AssignmentRelationFilter>;
  assignmentId?: InputMaybe<IntFilter>;
  availability?: InputMaybe<EnumAvailabilityNullableFilter>;
  availableFrom?: InputMaybe<DateTimeNullableFilter>;
  availableHours?: InputMaybe<IntNullableFilter>;
  background?: InputMaybe<StringNullableFilter>;
  city?: InputMaybe<StringNullableFilter>;
  companyId?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  documents?: InputMaybe<AssignmentApplicationFileListRelationFilter>;
  email?: InputMaybe<StringNullableFilter>;
  expertises?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  linkedInURL?: InputMaybe<StringNullableFilter>;
  motivation?: InputMaybe<StringNullableFilter>;
  owner?: InputMaybe<UserRelationFilter>;
  ownerId?: InputMaybe<IntFilter>;
  personalQualities?: InputMaybe<StringNullableFilter>;
  phoneNumber?: InputMaybe<StringNullableFilter>;
  rateFrom?: InputMaybe<FloatNullableFilter>;
  rateTo?: InputMaybe<FloatNullableFilter>;
  rateType?: InputMaybe<EnumRateTypeNullableFilter>;
  status?: InputMaybe<EnumAssignmentApplicationStatusFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<Scalars['String']['input']>;
  websiteURL?: InputMaybe<StringNullableFilter>;
};

export type AssignmentAvgAggregate = {
  __typename?: 'AssignmentAvgAggregate';
  companyId?: Maybe<Scalars['Float']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  hoursFrom?: Maybe<Scalars['Float']['output']>;
  hoursTo?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  ownerId?: Maybe<Scalars['Float']['output']>;
  rateFrom?: Maybe<Scalars['Float']['output']>;
  rateTo?: Maybe<Scalars['Float']['output']>;
};

export type AssignmentCount = {
  __typename?: 'AssignmentCount';
  Review: Scalars['Int']['output'];
  assignmentApplications: Scalars['Int']['output'];
  assignmentRead: Scalars['Int']['output'];
  expertises: Scalars['Int']['output'];
  favorites: Scalars['Int']['output'];
  matches: Scalars['Int']['output'];
};

export type AssignmentCountAggregate = {
  __typename?: 'AssignmentCountAggregate';
  _all: Scalars['Int']['output'];
  applicationDeadlineDate: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  contractType: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  customerRelation: Scalars['Int']['output'];
  customerRelationCompany: Scalars['Int']['output'];
  customerRelationCompanyVisible: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  duration: Scalars['Int']['output'];
  durationExtendable: Scalars['Int']['output'];
  durationType: Scalars['Int']['output'];
  externalCode: Scalars['Int']['output'];
  hideInDescription: Scalars['Int']['output'];
  hoursFrom: Scalars['Int']['output'];
  hoursTo: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  onLocation: Scalars['Int']['output'];
  ownerId: Scalars['Int']['output'];
  place: Scalars['Int']['output'];
  province: Scalars['Int']['output'];
  publishAt: Scalars['Int']['output'];
  publishUntil: Scalars['Int']['output'];
  rateFrom: Scalars['Int']['output'];
  rateTo: Scalars['Int']['output'];
  rateType: Scalars['Int']['output'];
  source: Scalars['Int']['output'];
  startAsap: Scalars['Int']['output'];
  startDate: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
  title: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type AssignmentCreateNestedOneWithoutReviewInput = {
  connect?: InputMaybe<AssignmentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AssignmentCreateOrConnectWithoutReviewInput>;
  create?: InputMaybe<AssignmentCreateWithoutReviewInput>;
};

export type AssignmentCreateOrConnectWithoutReviewInput = {
  create: AssignmentCreateWithoutReviewInput;
  where: AssignmentWhereUniqueInput;
};

export type AssignmentCreateWithoutReviewInput = {
  applicationDeadlineDate?: InputMaybe<Scalars['DateTime']['input']>;
  contractType?: InputMaybe<ContractType>;
  customerRelation?: InputMaybe<CustomerRelation>;
  customerRelationCompany?: InputMaybe<Scalars['String']['input']>;
  customerRelationCompanyVisible?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  durationExtendable?: InputMaybe<Scalars['Boolean']['input']>;
  durationType?: InputMaybe<DurationType>;
  expertises?: InputMaybe<AssignmentExpertiseCreateNestedManyWithoutAssignmentInput>;
  externalCode?: InputMaybe<Scalars['String']['input']>;
  hideInDescription?: InputMaybe<Scalars['Boolean']['input']>;
  hoursFrom?: InputMaybe<Scalars['Float']['input']>;
  hoursTo?: InputMaybe<Scalars['Float']['input']>;
  onLocation?: InputMaybe<OnLocation>;
  place?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  rateFrom?: InputMaybe<Scalars['Float']['input']>;
  rateTo?: InputMaybe<Scalars['Float']['input']>;
  rateType?: InputMaybe<RateType>;
  source?: InputMaybe<AssignmentSource>;
  startAsap?: InputMaybe<Scalars['Boolean']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AssignmentType>;
};

export type AssignmentExpertise = {
  __typename?: 'AssignmentExpertise';
  assignment: Assignment;
  assignmentId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  expertise: ExpertiseType;
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AssignmentExpertiseAssignmentIdExpertiseCompoundUniqueInput = {
  assignmentId: Scalars['Int']['input'];
  expertise: ExpertiseType;
};

export type AssignmentExpertiseAvgAggregate = {
  __typename?: 'AssignmentExpertiseAvgAggregate';
  assignmentId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type AssignmentExpertiseCountAggregate = {
  __typename?: 'AssignmentExpertiseCountAggregate';
  _all: Scalars['Int']['output'];
  assignmentId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  deletedAt: Scalars['Int']['output'];
  expertise: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type AssignmentExpertiseCreateManyAssignmentInput = {
  expertise: ExpertiseType;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type AssignmentExpertiseCreateManyAssignmentInputEnvelope = {
  data: Array<AssignmentExpertiseCreateManyAssignmentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssignmentExpertiseCreateNestedManyWithoutAssignmentInput = {
  connect?: InputMaybe<Array<AssignmentExpertiseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssignmentExpertiseCreateOrConnectWithoutAssignmentInput>>;
  create?: InputMaybe<Array<AssignmentExpertiseCreateWithoutAssignmentInput>>;
  createMany?: InputMaybe<AssignmentExpertiseCreateManyAssignmentInputEnvelope>;
};

export type AssignmentExpertiseCreateOrConnectWithoutAssignmentInput = {
  create: AssignmentExpertiseCreateWithoutAssignmentInput;
  where: AssignmentExpertiseWhereUniqueInput;
};

export type AssignmentExpertiseCreateWithoutAssignmentInput = {
  expertise: ExpertiseType;
};

export type AssignmentExpertiseListRelationFilter = {
  every?: InputMaybe<AssignmentExpertiseWhereInput>;
  none?: InputMaybe<AssignmentExpertiseWhereInput>;
  some?: InputMaybe<AssignmentExpertiseWhereInput>;
};

export type AssignmentExpertiseMaxAggregate = {
  __typename?: 'AssignmentExpertiseMaxAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  expertise?: Maybe<ExpertiseType>;
  id?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AssignmentExpertiseMinAggregate = {
  __typename?: 'AssignmentExpertiseMinAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  expertise?: Maybe<ExpertiseType>;
  id?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AssignmentExpertiseOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AssignmentExpertiseScalarWhereInput = {
  AND?: InputMaybe<Array<AssignmentExpertiseScalarWhereInput>>;
  NOT?: InputMaybe<Array<AssignmentExpertiseScalarWhereInput>>;
  OR?: InputMaybe<Array<AssignmentExpertiseScalarWhereInput>>;
  assignmentId?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  expertise?: InputMaybe<EnumExpertiseTypeFilter>;
  id?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AssignmentExpertiseSumAggregate = {
  __typename?: 'AssignmentExpertiseSumAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type AssignmentExpertiseUpdateManyMutationInput = {
  expertise?: InputMaybe<ExpertiseType>;
};

export type AssignmentExpertiseUpdateManyWithWhereWithoutAssignmentInput = {
  data: AssignmentExpertiseUpdateManyMutationInput;
  where: AssignmentExpertiseScalarWhereInput;
};

export type AssignmentExpertiseUpdateManyWithoutAssignmentNestedInput = {
  connect?: InputMaybe<Array<AssignmentExpertiseWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AssignmentExpertiseCreateOrConnectWithoutAssignmentInput>>;
  create?: InputMaybe<Array<AssignmentExpertiseCreateWithoutAssignmentInput>>;
  createMany?: InputMaybe<AssignmentExpertiseCreateManyAssignmentInputEnvelope>;
  delete?: InputMaybe<Array<AssignmentExpertiseWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AssignmentExpertiseScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AssignmentExpertiseWhereUniqueInput>>;
  set?: InputMaybe<Array<AssignmentExpertiseWhereUniqueInput>>;
  update?: InputMaybe<Array<AssignmentExpertiseUpdateWithWhereUniqueWithoutAssignmentInput>>;
  updateMany?: InputMaybe<Array<AssignmentExpertiseUpdateManyWithWhereWithoutAssignmentInput>>;
  upsert?: InputMaybe<Array<AssignmentExpertiseUpsertWithWhereUniqueWithoutAssignmentInput>>;
};

export type AssignmentExpertiseUpdateWithWhereUniqueWithoutAssignmentInput = {
  data: AssignmentExpertiseUpdateWithoutAssignmentInput;
  where: AssignmentExpertiseWhereUniqueInput;
};

export type AssignmentExpertiseUpdateWithoutAssignmentInput = {
  expertise?: InputMaybe<ExpertiseType>;
};

export type AssignmentExpertiseUpsertWithWhereUniqueWithoutAssignmentInput = {
  create: AssignmentExpertiseCreateWithoutAssignmentInput;
  update: AssignmentExpertiseUpdateWithoutAssignmentInput;
  where: AssignmentExpertiseWhereUniqueInput;
};

export type AssignmentExpertiseWhereInput = {
  AND?: InputMaybe<Array<AssignmentExpertiseWhereInput>>;
  NOT?: InputMaybe<Array<AssignmentExpertiseWhereInput>>;
  OR?: InputMaybe<Array<AssignmentExpertiseWhereInput>>;
  assignmentId?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  expertise?: InputMaybe<EnumExpertiseTypeFilter>;
  id?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AssignmentExpertiseWhereUniqueInput = {
  AND?: InputMaybe<Array<AssignmentExpertiseWhereInput>>;
  NOT?: InputMaybe<Array<AssignmentExpertiseWhereInput>>;
  OR?: InputMaybe<Array<AssignmentExpertiseWhereInput>>;
  assignmentId?: InputMaybe<IntFilter>;
  assignmentId_expertise?: InputMaybe<AssignmentExpertiseAssignmentIdExpertiseCompoundUniqueInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  expertise?: InputMaybe<EnumExpertiseTypeFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AssignmentMaxAggregate = {
  __typename?: 'AssignmentMaxAggregate';
  applicationDeadlineDate?: Maybe<Scalars['DateTime']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  contractType?: Maybe<ContractType>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customerRelation?: Maybe<CustomerRelation>;
  customerRelationCompany?: Maybe<Scalars['String']['output']>;
  customerRelationCompanyVisible?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  durationExtendable?: Maybe<Scalars['Boolean']['output']>;
  durationType?: Maybe<DurationType>;
  externalCode?: Maybe<Scalars['String']['output']>;
  hideInDescription?: Maybe<Scalars['Boolean']['output']>;
  hoursFrom?: Maybe<Scalars['Float']['output']>;
  hoursTo?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  onLocation?: Maybe<OnLocation>;
  ownerId?: Maybe<Scalars['Int']['output']>;
  place?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  publishAt?: Maybe<Scalars['DateTime']['output']>;
  publishUntil?: Maybe<Scalars['DateTime']['output']>;
  rateFrom?: Maybe<Scalars['Float']['output']>;
  rateTo?: Maybe<Scalars['Float']['output']>;
  rateType?: Maybe<RateType>;
  source?: Maybe<AssignmentSource>;
  startAsap?: Maybe<Scalars['Boolean']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<AssignmentStatus>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<AssignmentType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type AssignmentMinAggregate = {
  __typename?: 'AssignmentMinAggregate';
  applicationDeadlineDate?: Maybe<Scalars['DateTime']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  contractType?: Maybe<ContractType>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customerRelation?: Maybe<CustomerRelation>;
  customerRelationCompany?: Maybe<Scalars['String']['output']>;
  customerRelationCompanyVisible?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  durationExtendable?: Maybe<Scalars['Boolean']['output']>;
  durationType?: Maybe<DurationType>;
  externalCode?: Maybe<Scalars['String']['output']>;
  hideInDescription?: Maybe<Scalars['Boolean']['output']>;
  hoursFrom?: Maybe<Scalars['Float']['output']>;
  hoursTo?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  onLocation?: Maybe<OnLocation>;
  ownerId?: Maybe<Scalars['Int']['output']>;
  place?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  publishAt?: Maybe<Scalars['DateTime']['output']>;
  publishUntil?: Maybe<Scalars['DateTime']['output']>;
  rateFrom?: Maybe<Scalars['Float']['output']>;
  rateTo?: Maybe<Scalars['Float']['output']>;
  rateType?: Maybe<RateType>;
  source?: Maybe<AssignmentSource>;
  startAsap?: Maybe<Scalars['Boolean']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<AssignmentStatus>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<AssignmentType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

/** Gives a reason why the assignment is not visible */
export enum AssignmentNotVisibleReason {
  FreelancerBasic = 'FREELANCER_BASIC',
  MarketmonitorNoCredits = 'MARKETMONITOR_NO_CREDITS',
  MarketmonitorWaitingPeriod = 'MARKETMONITOR_WAITING_PERIOD',
  NoAssignmentId = 'NO_ASSIGNMENT_ID'
}

export type AssignmentNullableRelationFilter = {
  is?: InputMaybe<AssignmentWhereInput>;
  isNot?: InputMaybe<AssignmentWhereInput>;
};

export type AssignmentOrderByWithRelationInput = {
  applicationDeadlineDate?: InputMaybe<SortOrderInput>;
  company?: InputMaybe<CompanyOrderByWithRelationInput>;
  companyId?: InputMaybe<SortOrder>;
  contractType?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  customerRelation?: InputMaybe<SortOrderInput>;
  customerRelationCompany?: InputMaybe<SortOrderInput>;
  customerRelationCompanyVisible?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrderInput>;
  duration?: InputMaybe<SortOrderInput>;
  durationExtendable?: InputMaybe<SortOrder>;
  durationType?: InputMaybe<SortOrderInput>;
  expertises?: InputMaybe<AssignmentExpertiseOrderByRelationAggregateInput>;
  externalCode?: InputMaybe<SortOrderInput>;
  hideInDescription?: InputMaybe<SortOrder>;
  hoursFrom?: InputMaybe<SortOrderInput>;
  hoursTo?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  onLocation?: InputMaybe<SortOrderInput>;
  ownerId?: InputMaybe<SortOrder>;
  place?: InputMaybe<SortOrderInput>;
  province?: InputMaybe<SortOrderInput>;
  rateFrom?: InputMaybe<SortOrderInput>;
  rateTo?: InputMaybe<SortOrderInput>;
  rateType?: InputMaybe<SortOrderInput>;
  source?: InputMaybe<SortOrder>;
  startAsap?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrderInput>;
  status?: InputMaybe<SortOrderInput>;
  title?: InputMaybe<SortOrderInput>;
  type?: InputMaybe<SortOrderInput>;
  updatedAt?: InputMaybe<SortOrder>;
  uuid?: InputMaybe<SortOrder>;
};

export type AssignmentRead = {
  __typename?: 'AssignmentRead';
  assignment: Assignment;
  assignmentId: Scalars['Int']['output'];
  company: Company;
  companyId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  readAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type AssignmentReadAvgAggregate = {
  __typename?: 'AssignmentReadAvgAggregate';
  assignmentId?: Maybe<Scalars['Float']['output']>;
  companyId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type AssignmentReadCountAggregate = {
  __typename?: 'AssignmentReadCountAggregate';
  _all: Scalars['Int']['output'];
  assignmentId: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  readAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type AssignmentReadMaxAggregate = {
  __typename?: 'AssignmentReadMaxAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type AssignmentReadMinAggregate = {
  __typename?: 'AssignmentReadMinAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type AssignmentReadSumAggregate = {
  __typename?: 'AssignmentReadSumAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type AssignmentRelationFilter = {
  is?: InputMaybe<AssignmentWhereInput>;
  isNot?: InputMaybe<AssignmentWhereInput>;
};

export enum AssignmentScalarFieldEnum {
  ApplicationDeadlineDate = 'applicationDeadlineDate',
  CompanyId = 'companyId',
  ContractType = 'contractType',
  CreatedAt = 'createdAt',
  CustomerRelation = 'customerRelation',
  CustomerRelationCompany = 'customerRelationCompany',
  CustomerRelationCompanyVisible = 'customerRelationCompanyVisible',
  DeletedAt = 'deletedAt',
  Description = 'description',
  Duration = 'duration',
  DurationExtendable = 'durationExtendable',
  DurationType = 'durationType',
  ExternalCode = 'externalCode',
  HideInDescription = 'hideInDescription',
  HoursFrom = 'hoursFrom',
  HoursTo = 'hoursTo',
  Id = 'id',
  MatchBatchId = 'matchBatchId',
  OnLocation = 'onLocation',
  OwnerId = 'ownerId',
  Place = 'place',
  Province = 'province',
  PublishAt = 'publishAt',
  PublishUntil = 'publishUntil',
  RateFrom = 'rateFrom',
  RateTo = 'rateTo',
  RateType = 'rateType',
  Source = 'source',
  StartAsap = 'startAsap',
  StartDate = 'startDate',
  Status = 'status',
  Title = 'title',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  Uuid = 'uuid'
}

export enum AssignmentSource {
  Api = 'API',
  Platform = 'PLATFORM'
}

export enum AssignmentStatus {
  Archived = 'ARCHIVED',
  Closed = 'CLOSED',
  Concept = 'CONCEPT',
  Declined = 'DECLINED',
  InReview = 'IN_REVIEW',
  Paused = 'PAUSED',
  PendingReview = 'PENDING_REVIEW',
  Published = 'PUBLISHED',
  Publishing = 'PUBLISHING',
  Reviewed = 'REVIEWED'
}

export type AssignmentSumAggregate = {
  __typename?: 'AssignmentSumAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  duration?: Maybe<Scalars['Int']['output']>;
  hoursFrom?: Maybe<Scalars['Float']['output']>;
  hoursTo?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  ownerId?: Maybe<Scalars['Int']['output']>;
  rateFrom?: Maybe<Scalars['Float']['output']>;
  rateTo?: Maybe<Scalars['Float']['output']>;
};

export enum AssignmentType {
  Basic = 'BASIC',
  ContractingServices = 'CONTRACTING_SERVICES',
  Top = 'TOP'
}

export type AssignmentUpdateInput = {
  applicationDeadlineDate?: InputMaybe<Scalars['DateTime']['input']>;
  contractType?: InputMaybe<ContractType>;
  customerRelation?: InputMaybe<CustomerRelation>;
  customerRelationCompany?: InputMaybe<Scalars['String']['input']>;
  customerRelationCompanyVisible?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  durationExtendable?: InputMaybe<Scalars['Boolean']['input']>;
  durationType?: InputMaybe<DurationType>;
  expertises?: InputMaybe<AssignmentExpertiseUpdateManyWithoutAssignmentNestedInput>;
  externalCode?: InputMaybe<Scalars['String']['input']>;
  hideInDescription?: InputMaybe<Scalars['Boolean']['input']>;
  hoursFrom?: InputMaybe<Scalars['Float']['input']>;
  hoursTo?: InputMaybe<Scalars['Float']['input']>;
  onLocation?: InputMaybe<OnLocation>;
  place?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  rateFrom?: InputMaybe<Scalars['Float']['input']>;
  rateTo?: InputMaybe<Scalars['Float']['input']>;
  rateType?: InputMaybe<RateType>;
  source?: InputMaybe<AssignmentSource>;
  startAsap?: InputMaybe<Scalars['Boolean']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AssignmentType>;
};

export type AssignmentWhereInput = {
  AND?: InputMaybe<Array<AssignmentWhereInput>>;
  NOT?: InputMaybe<Array<AssignmentWhereInput>>;
  OR?: InputMaybe<Array<AssignmentWhereInput>>;
  applicationDeadlineDate?: InputMaybe<DateTimeNullableFilter>;
  company?: InputMaybe<CompanyRelationFilter>;
  companyId?: InputMaybe<IntFilter>;
  contractType?: InputMaybe<EnumContractTypeNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  customerRelation?: InputMaybe<EnumCustomerRelationNullableFilter>;
  customerRelationCompany?: InputMaybe<StringNullableFilter>;
  customerRelationCompanyVisible?: InputMaybe<BoolFilter>;
  description?: InputMaybe<StringNullableFilter>;
  duration?: InputMaybe<IntNullableFilter>;
  durationExtendable?: InputMaybe<BoolFilter>;
  durationType?: InputMaybe<EnumDurationTypeNullableFilter>;
  expertises?: InputMaybe<AssignmentExpertiseListRelationFilter>;
  externalCode?: InputMaybe<StringNullableFilter>;
  hideInDescription?: InputMaybe<BoolFilter>;
  hoursFrom?: InputMaybe<FloatNullableFilter>;
  hoursTo?: InputMaybe<FloatNullableFilter>;
  id?: InputMaybe<IntFilter>;
  onLocation?: InputMaybe<EnumOnLocationNullableFilter>;
  ownerId?: InputMaybe<IntFilter>;
  place?: InputMaybe<StringNullableFilter>;
  province?: InputMaybe<StringNullableFilter>;
  rateFrom?: InputMaybe<FloatNullableFilter>;
  rateTo?: InputMaybe<FloatNullableFilter>;
  rateType?: InputMaybe<EnumRateTypeNullableFilter>;
  source?: InputMaybe<EnumAssignmentSourceFilter>;
  startAsap?: InputMaybe<BoolFilter>;
  startDate?: InputMaybe<DateTimeNullableFilter>;
  status?: InputMaybe<EnumAssignmentStatusNullableFilter>;
  title?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumAssignmentTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type AssignmentWhereUniqueInput = {
  AND?: InputMaybe<Array<AssignmentWhereInput>>;
  NOT?: InputMaybe<Array<AssignmentWhereInput>>;
  OR?: InputMaybe<Array<AssignmentWhereInput>>;
  applicationDeadlineDate?: InputMaybe<DateTimeNullableFilter>;
  company?: InputMaybe<CompanyRelationFilter>;
  companyId?: InputMaybe<IntFilter>;
  contractType?: InputMaybe<EnumContractTypeNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  customerRelation?: InputMaybe<EnumCustomerRelationNullableFilter>;
  customerRelationCompany?: InputMaybe<StringNullableFilter>;
  customerRelationCompanyVisible?: InputMaybe<BoolFilter>;
  description?: InputMaybe<StringNullableFilter>;
  duration?: InputMaybe<IntNullableFilter>;
  durationExtendable?: InputMaybe<BoolFilter>;
  durationType?: InputMaybe<EnumDurationTypeNullableFilter>;
  expertises?: InputMaybe<AssignmentExpertiseListRelationFilter>;
  externalCode?: InputMaybe<StringNullableFilter>;
  hideInDescription?: InputMaybe<BoolFilter>;
  hoursFrom?: InputMaybe<FloatNullableFilter>;
  hoursTo?: InputMaybe<FloatNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  onLocation?: InputMaybe<EnumOnLocationNullableFilter>;
  ownerId?: InputMaybe<IntFilter>;
  place?: InputMaybe<StringNullableFilter>;
  province?: InputMaybe<StringNullableFilter>;
  rateFrom?: InputMaybe<FloatNullableFilter>;
  rateTo?: InputMaybe<FloatNullableFilter>;
  rateType?: InputMaybe<EnumRateTypeNullableFilter>;
  source?: InputMaybe<EnumAssignmentSourceFilter>;
  startAsap?: InputMaybe<BoolFilter>;
  startDate?: InputMaybe<DateTimeNullableFilter>;
  status?: InputMaybe<EnumAssignmentStatusNullableFilter>;
  title?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumAssignmentTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export enum Availability {
  Immediately = 'IMMEDIATELY',
  Negotiable = 'NEGOTIABLE'
}

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type BoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type CheckTokenOutput = {
  __typename?: 'CheckTokenOutput';
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  success: Scalars['String']['output'];
};

export type Checkout = {
  __typename?: 'Checkout';
  company: ExternalProviderCompany;
  companyId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  plan: Plan;
  planId: Scalars['Int']['output'];
  session: StripeSession;
  sessionId: Scalars['String']['output'];
  token: Scalars['String']['output'];
  userId: Scalars['Int']['output'];
};

export type CheckoutAvgAggregate = {
  __typename?: 'CheckoutAvgAggregate';
  companyId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  planId?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type CheckoutCountAggregate = {
  __typename?: 'CheckoutCountAggregate';
  _all: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  planId: Scalars['Int']['output'];
  sessionId: Scalars['Int']['output'];
  token: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type CheckoutCreateInput = {
  companyId: Scalars['Int']['input'];
  planId: Scalars['Int']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type CheckoutCreateManyPlanInput = {
  companyId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  sessionId: Scalars['String']['input'];
  token: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type CheckoutCreateManyPlanInputEnvelope = {
  data: Array<CheckoutCreateManyPlanInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CheckoutCreateNestedManyWithoutPlanInput = {
  connect?: InputMaybe<Array<CheckoutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CheckoutCreateOrConnectWithoutPlanInput>>;
  create?: InputMaybe<Array<CheckoutCreateWithoutPlanInput>>;
  createMany?: InputMaybe<CheckoutCreateManyPlanInputEnvelope>;
};

export type CheckoutCreateOrConnectWithoutPlanInput = {
  create: CheckoutCreateWithoutPlanInput;
  where: CheckoutWhereUniqueInput;
};

export type CheckoutCreateWithoutPlanInput = {
  company: ExternalProviderCompanyCreateNestedOneWithoutCheckoutInput;
  sessionId: Scalars['String']['input'];
  token: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type CheckoutInvoice = {
  __typename?: 'CheckoutInvoice';
  /** Indicates if the checkout invoice creation was successful */
  isSuccessful: Scalars['Boolean']['output'];
  token: Scalars['String']['output'];
};

export type CheckoutInvoiceCreateInput = {
  planId: Scalars['Int']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type CheckoutInvoiceDetails = {
  __typename?: 'CheckoutInvoiceDetails';
  currency: Scalars['String']['output'];
  invoiceId: Scalars['String']['output'];
  itemId: Scalars['String']['output'];
  itemName: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  tax: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

export type CheckoutListRelationFilter = {
  every?: InputMaybe<CheckoutWhereInput>;
  none?: InputMaybe<CheckoutWhereInput>;
  some?: InputMaybe<CheckoutWhereInput>;
};

export type CheckoutMaxAggregate = {
  __typename?: 'CheckoutMaxAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  planId?: Maybe<Scalars['Int']['output']>;
  sessionId?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type CheckoutMinAggregate = {
  __typename?: 'CheckoutMinAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  planId?: Maybe<Scalars['Int']['output']>;
  sessionId?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type CheckoutOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CheckoutOrderByWithRelationInput = {
  company?: InputMaybe<ExternalProviderCompanyOrderByWithRelationInput>;
  companyId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  plan?: InputMaybe<PlanOrderByWithRelationInput>;
  planId?: InputMaybe<SortOrder>;
  sessionId?: InputMaybe<SortOrder>;
  token?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export enum CheckoutScalarFieldEnum {
  CompanyId = 'companyId',
  Id = 'id',
  PlanId = 'planId',
  SessionId = 'sessionId',
  Token = 'token',
  UserId = 'userId'
}

export type CheckoutScalarWhereInput = {
  AND?: InputMaybe<Array<CheckoutScalarWhereInput>>;
  NOT?: InputMaybe<Array<CheckoutScalarWhereInput>>;
  OR?: InputMaybe<Array<CheckoutScalarWhereInput>>;
  companyId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  planId?: InputMaybe<IntFilter>;
  sessionId?: InputMaybe<StringFilter>;
  token?: InputMaybe<StringFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type CheckoutSumAggregate = {
  __typename?: 'CheckoutSumAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  planId?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type CheckoutUpdateManyMutationInput = {
  sessionId?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type CheckoutUpdateManyWithWhereWithoutPlanInput = {
  data: CheckoutUpdateManyMutationInput;
  where: CheckoutScalarWhereInput;
};

export type CheckoutUpdateManyWithoutPlanNestedInput = {
  connect?: InputMaybe<Array<CheckoutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CheckoutCreateOrConnectWithoutPlanInput>>;
  create?: InputMaybe<Array<CheckoutCreateWithoutPlanInput>>;
  createMany?: InputMaybe<CheckoutCreateManyPlanInputEnvelope>;
  delete?: InputMaybe<Array<CheckoutWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CheckoutScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CheckoutWhereUniqueInput>>;
  set?: InputMaybe<Array<CheckoutWhereUniqueInput>>;
  update?: InputMaybe<Array<CheckoutUpdateWithWhereUniqueWithoutPlanInput>>;
  updateMany?: InputMaybe<Array<CheckoutUpdateManyWithWhereWithoutPlanInput>>;
  upsert?: InputMaybe<Array<CheckoutUpsertWithWhereUniqueWithoutPlanInput>>;
};

export type CheckoutUpdateWithWhereUniqueWithoutPlanInput = {
  data: CheckoutUpdateWithoutPlanInput;
  where: CheckoutWhereUniqueInput;
};

export type CheckoutUpdateWithoutPlanInput = {
  company?: InputMaybe<ExternalProviderCompanyUpdateOneRequiredWithoutCheckoutNestedInput>;
  sessionId?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type CheckoutUpsertWithWhereUniqueWithoutPlanInput = {
  create: CheckoutCreateWithoutPlanInput;
  update: CheckoutUpdateWithoutPlanInput;
  where: CheckoutWhereUniqueInput;
};

export type CheckoutWhereInput = {
  AND?: InputMaybe<Array<CheckoutWhereInput>>;
  NOT?: InputMaybe<Array<CheckoutWhereInput>>;
  OR?: InputMaybe<Array<CheckoutWhereInput>>;
  company?: InputMaybe<ExternalProviderCompanyRelationFilter>;
  companyId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  plan?: InputMaybe<PlanRelationFilter>;
  planId?: InputMaybe<IntFilter>;
  sessionId?: InputMaybe<StringFilter>;
  token?: InputMaybe<StringFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type CheckoutWhereUniqueInput = {
  AND?: InputMaybe<Array<CheckoutWhereInput>>;
  NOT?: InputMaybe<Array<CheckoutWhereInput>>;
  OR?: InputMaybe<Array<CheckoutWhereInput>>;
  company?: InputMaybe<ExternalProviderCompanyRelationFilter>;
  companyId?: InputMaybe<IntFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  plan?: InputMaybe<PlanRelationFilter>;
  planId?: InputMaybe<IntFilter>;
  sessionId?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<IntFilter>;
};

export type Company = {
  __typename?: 'Company';
  _count: CompanyCount;
  about?: Maybe<Scalars['String']['output']>;
  active?: Maybe<Scalars['Boolean']['output']>;
  address?: Maybe<Address>;
  addressId?: Maybe<Scalars['Int']['output']>;
  apiEmailRegex: Scalars['String']['output'];
  assignmentCount: Scalars['Int']['output'];
  assignmentRead?: Maybe<Array<AssignmentRead>>;
  assignments?: Maybe<Array<Assignment>>;
  billingAddress?: Maybe<Address>;
  billingAddressId?: Maybe<Scalars['Int']['output']>;
  billingEmail?: Maybe<Scalars['String']['output']>;
  cocCountry?: Maybe<Scalars['String']['output']>;
  cocNumber?: Maybe<Scalars['String']['output']>;
  companyReferences?: Maybe<Array<CompanyReference>>;
  companyUsers?: Maybe<Array<UsersCompanies>>;
  contracts: Array<Contract>;
  coverImageFile?: Maybe<File>;
  coverImageFileId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  credits: Scalars['Int']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  hasActiveUsers?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  latestTopReviewText?: Maybe<Scalars['String']['output']>;
  logoImageFile?: Maybe<File>;
  logoImageFileId?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  openAssignmentCount: Scalars['Int']['output'];
  profile?: Maybe<Profile>;
  recruiterCount: Scalars['Int']['output'];
  reviews?: Maybe<Array<Review>>;
  showCurrentAssignments: Scalars['Boolean']['output'];
  showEmployees: Scalars['Boolean']['output'];
  type: CompanyType;
  updatedAt: Scalars['DateTime']['output'];
  vatNumber?: Maybe<Scalars['String']['output']>;
  verificationData?: Maybe<Scalars['String']['output']>;
  websiteUrl?: Maybe<Scalars['String']['output']>;
  youtubeUrl?: Maybe<Scalars['String']['output']>;
};

export type CompanyAvgAggregate = {
  __typename?: 'CompanyAvgAggregate';
  addressId?: Maybe<Scalars['Float']['output']>;
  billingAddressId?: Maybe<Scalars['Float']['output']>;
  coverImageFileId?: Maybe<Scalars['Float']['output']>;
  credits?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  logoImageFileId?: Maybe<Scalars['Float']['output']>;
};

export type CompanyCount = {
  __typename?: 'CompanyCount';
  assignmentRead: Scalars['Int']['output'];
  assignments: Scalars['Int']['output'];
  companyReferences: Scalars['Int']['output'];
  companyUsers: Scalars['Int']['output'];
  reviews: Scalars['Int']['output'];
};

export type CompanyCountAggregate = {
  __typename?: 'CompanyCountAggregate';
  _all: Scalars['Int']['output'];
  about: Scalars['Int']['output'];
  active: Scalars['Int']['output'];
  addressId: Scalars['Int']['output'];
  billingAddressId: Scalars['Int']['output'];
  billingEmail: Scalars['Int']['output'];
  cocCountry: Scalars['Int']['output'];
  cocNumber: Scalars['Int']['output'];
  coverImageFileId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  credits: Scalars['Int']['output'];
  deletedAt: Scalars['Int']['output'];
  email: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  logoImageFileId: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  showCurrentAssignments: Scalars['Int']['output'];
  showEmployees: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  vatNumber: Scalars['Int']['output'];
  verificationData: Scalars['Int']['output'];
  websiteUrl: Scalars['Int']['output'];
  youtubeUrl: Scalars['Int']['output'];
};

export type CompanyCreateInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  address?: InputMaybe<AddressCreateNestedOneWithoutCompaniesInput>;
  billingAddress?: InputMaybe<AddressCreateNestedOneWithoutBillingCompaniesInput>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  cocCountry?: InputMaybe<Scalars['String']['input']>;
  cocNumber?: InputMaybe<Scalars['String']['input']>;
  companyReferences?: InputMaybe<CompanyReferenceCreateNestedManyWithoutCompanyInput>;
  coverImageFile?: InputMaybe<FileCreateNestedOneWithoutCoverImageCompaniesInput>;
  credits?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  logoImageFile?: InputMaybe<FileCreateNestedOneWithoutLogoImageCompaniesInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<ProfileCreateNestedOneWithoutCompanyInput>;
  showCurrentAssignments?: InputMaybe<Scalars['Boolean']['input']>;
  showEmployees?: InputMaybe<Scalars['Boolean']['input']>;
  type: CompanyType;
  vatNumber?: InputMaybe<Scalars['String']['input']>;
  verificationData?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyCreateManyAddressInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  billingAddressId?: InputMaybe<Scalars['Int']['input']>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  cocCountry?: InputMaybe<Scalars['String']['input']>;
  cocNumber?: InputMaybe<Scalars['String']['input']>;
  coverImageFileId?: InputMaybe<Scalars['Int']['input']>;
  credits?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  logoImageFileId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  showCurrentAssignments?: InputMaybe<Scalars['Boolean']['input']>;
  showEmployees?: InputMaybe<Scalars['Boolean']['input']>;
  type: CompanyType;
  vatNumber?: InputMaybe<Scalars['String']['input']>;
  verificationData?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyCreateManyAddressInputEnvelope = {
  data: Array<CompanyCreateManyAddressInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CompanyCreateManyBillingAddressInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  addressId?: InputMaybe<Scalars['Int']['input']>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  cocCountry?: InputMaybe<Scalars['String']['input']>;
  cocNumber?: InputMaybe<Scalars['String']['input']>;
  coverImageFileId?: InputMaybe<Scalars['Int']['input']>;
  credits?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  logoImageFileId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  showCurrentAssignments?: InputMaybe<Scalars['Boolean']['input']>;
  showEmployees?: InputMaybe<Scalars['Boolean']['input']>;
  type: CompanyType;
  vatNumber?: InputMaybe<Scalars['String']['input']>;
  verificationData?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyCreateManyBillingAddressInputEnvelope = {
  data: Array<CompanyCreateManyBillingAddressInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CompanyCreateNestedManyWithoutAddressInput = {
  connect?: InputMaybe<Array<CompanyWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CompanyCreateOrConnectWithoutAddressInput>>;
  create?: InputMaybe<Array<CompanyCreateWithoutAddressInput>>;
  createMany?: InputMaybe<CompanyCreateManyAddressInputEnvelope>;
};

export type CompanyCreateNestedManyWithoutBillingAddressInput = {
  connect?: InputMaybe<Array<CompanyWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CompanyCreateOrConnectWithoutBillingAddressInput>>;
  create?: InputMaybe<Array<CompanyCreateWithoutBillingAddressInput>>;
  createMany?: InputMaybe<CompanyCreateManyBillingAddressInputEnvelope>;
};

export type CompanyCreateNestedOneWithoutCompanyReferencesInput = {
  connect?: InputMaybe<CompanyWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CompanyCreateOrConnectWithoutCompanyReferencesInput>;
  create?: InputMaybe<CompanyCreateWithoutCompanyReferencesInput>;
};

export type CompanyCreateNestedOneWithoutReviewsInput = {
  connect?: InputMaybe<CompanyWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CompanyCreateOrConnectWithoutReviewsInput>;
  create?: InputMaybe<CompanyCreateWithoutReviewsInput>;
};

export type CompanyCreateOrConnectWithoutAddressInput = {
  create: CompanyCreateWithoutAddressInput;
  where: CompanyWhereUniqueInput;
};

export type CompanyCreateOrConnectWithoutBillingAddressInput = {
  create: CompanyCreateWithoutBillingAddressInput;
  where: CompanyWhereUniqueInput;
};

export type CompanyCreateOrConnectWithoutCompanyReferencesInput = {
  create: CompanyCreateWithoutCompanyReferencesInput;
  where: CompanyWhereUniqueInput;
};

export type CompanyCreateOrConnectWithoutReviewsInput = {
  create: CompanyCreateWithoutReviewsInput;
  where: CompanyWhereUniqueInput;
};

export type CompanyCreateWithoutAddressInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  billingAddress?: InputMaybe<AddressCreateNestedOneWithoutBillingCompaniesInput>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  cocCountry?: InputMaybe<Scalars['String']['input']>;
  cocNumber?: InputMaybe<Scalars['String']['input']>;
  companyReferences?: InputMaybe<CompanyReferenceCreateNestedManyWithoutCompanyInput>;
  coverImageFile?: InputMaybe<FileCreateNestedOneWithoutCoverImageCompaniesInput>;
  credits?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  logoImageFile?: InputMaybe<FileCreateNestedOneWithoutLogoImageCompaniesInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<ProfileCreateNestedOneWithoutCompanyInput>;
  showCurrentAssignments?: InputMaybe<Scalars['Boolean']['input']>;
  showEmployees?: InputMaybe<Scalars['Boolean']['input']>;
  type: CompanyType;
  vatNumber?: InputMaybe<Scalars['String']['input']>;
  verificationData?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyCreateWithoutBillingAddressInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  address?: InputMaybe<AddressCreateNestedOneWithoutCompaniesInput>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  cocCountry?: InputMaybe<Scalars['String']['input']>;
  cocNumber?: InputMaybe<Scalars['String']['input']>;
  companyReferences?: InputMaybe<CompanyReferenceCreateNestedManyWithoutCompanyInput>;
  coverImageFile?: InputMaybe<FileCreateNestedOneWithoutCoverImageCompaniesInput>;
  credits?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  logoImageFile?: InputMaybe<FileCreateNestedOneWithoutLogoImageCompaniesInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<ProfileCreateNestedOneWithoutCompanyInput>;
  showCurrentAssignments?: InputMaybe<Scalars['Boolean']['input']>;
  showEmployees?: InputMaybe<Scalars['Boolean']['input']>;
  type: CompanyType;
  vatNumber?: InputMaybe<Scalars['String']['input']>;
  verificationData?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyCreateWithoutCompanyReferencesInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  address?: InputMaybe<AddressCreateNestedOneWithoutCompaniesInput>;
  billingAddress?: InputMaybe<AddressCreateNestedOneWithoutBillingCompaniesInput>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  cocCountry?: InputMaybe<Scalars['String']['input']>;
  cocNumber?: InputMaybe<Scalars['String']['input']>;
  coverImageFile?: InputMaybe<FileCreateNestedOneWithoutCoverImageCompaniesInput>;
  credits?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  logoImageFile?: InputMaybe<FileCreateNestedOneWithoutLogoImageCompaniesInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<ProfileCreateNestedOneWithoutCompanyInput>;
  showCurrentAssignments?: InputMaybe<Scalars['Boolean']['input']>;
  showEmployees?: InputMaybe<Scalars['Boolean']['input']>;
  type: CompanyType;
  vatNumber?: InputMaybe<Scalars['String']['input']>;
  verificationData?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyCreateWithoutReviewsInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  address?: InputMaybe<AddressCreateNestedOneWithoutCompaniesInput>;
  billingAddress?: InputMaybe<AddressCreateNestedOneWithoutBillingCompaniesInput>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  cocCountry?: InputMaybe<Scalars['String']['input']>;
  cocNumber?: InputMaybe<Scalars['String']['input']>;
  companyReferences?: InputMaybe<CompanyReferenceCreateNestedManyWithoutCompanyInput>;
  coverImageFile?: InputMaybe<FileCreateNestedOneWithoutCoverImageCompaniesInput>;
  credits?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  logoImageFile?: InputMaybe<FileCreateNestedOneWithoutLogoImageCompaniesInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<ProfileCreateNestedOneWithoutCompanyInput>;
  showCurrentAssignments?: InputMaybe<Scalars['Boolean']['input']>;
  showEmployees?: InputMaybe<Scalars['Boolean']['input']>;
  type: CompanyType;
  vatNumber?: InputMaybe<Scalars['String']['input']>;
  verificationData?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export enum CompanyImageType {
  Cover = 'COVER',
  Logo = 'LOGO'
}

export type CompanyListRelationFilter = {
  every?: InputMaybe<CompanyWhereInput>;
  none?: InputMaybe<CompanyWhereInput>;
  some?: InputMaybe<CompanyWhereInput>;
};

export type CompanyMaxAggregate = {
  __typename?: 'CompanyMaxAggregate';
  about?: Maybe<Scalars['String']['output']>;
  active?: Maybe<Scalars['Boolean']['output']>;
  addressId?: Maybe<Scalars['Int']['output']>;
  billingAddressId?: Maybe<Scalars['Int']['output']>;
  billingEmail?: Maybe<Scalars['String']['output']>;
  cocCountry?: Maybe<Scalars['String']['output']>;
  cocNumber?: Maybe<Scalars['String']['output']>;
  coverImageFileId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  credits?: Maybe<Scalars['Int']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  logoImageFileId?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  showCurrentAssignments?: Maybe<Scalars['Boolean']['output']>;
  showEmployees?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<CompanyType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  vatNumber?: Maybe<Scalars['String']['output']>;
  verificationData?: Maybe<Scalars['String']['output']>;
  websiteUrl?: Maybe<Scalars['String']['output']>;
  youtubeUrl?: Maybe<Scalars['String']['output']>;
};

export type CompanyMinAggregate = {
  __typename?: 'CompanyMinAggregate';
  about?: Maybe<Scalars['String']['output']>;
  active?: Maybe<Scalars['Boolean']['output']>;
  addressId?: Maybe<Scalars['Int']['output']>;
  billingAddressId?: Maybe<Scalars['Int']['output']>;
  billingEmail?: Maybe<Scalars['String']['output']>;
  cocCountry?: Maybe<Scalars['String']['output']>;
  cocNumber?: Maybe<Scalars['String']['output']>;
  coverImageFileId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  credits?: Maybe<Scalars['Int']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  logoImageFileId?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  showCurrentAssignments?: Maybe<Scalars['Boolean']['output']>;
  showEmployees?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<CompanyType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  vatNumber?: Maybe<Scalars['String']['output']>;
  verificationData?: Maybe<Scalars['String']['output']>;
  websiteUrl?: Maybe<Scalars['String']['output']>;
  youtubeUrl?: Maybe<Scalars['String']['output']>;
};

export type CompanyOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CompanyOrderByWithRelationInput = {
  about?: InputMaybe<SortOrderInput>;
  active?: InputMaybe<SortOrderInput>;
  address?: InputMaybe<AddressOrderByWithRelationInput>;
  addressId?: InputMaybe<SortOrderInput>;
  billingAddress?: InputMaybe<AddressOrderByWithRelationInput>;
  billingAddressId?: InputMaybe<SortOrderInput>;
  billingEmail?: InputMaybe<SortOrderInput>;
  cocCountry?: InputMaybe<SortOrderInput>;
  cocNumber?: InputMaybe<SortOrderInput>;
  companyReferences?: InputMaybe<CompanyReferenceOrderByRelationAggregateInput>;
  coverImageFile?: InputMaybe<FileOrderByWithRelationInput>;
  coverImageFileId?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  credits?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  logoImageFile?: InputMaybe<FileOrderByWithRelationInput>;
  logoImageFileId?: InputMaybe<SortOrderInput>;
  name?: InputMaybe<SortOrderInput>;
  profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  showCurrentAssignments?: InputMaybe<SortOrder>;
  showEmployees?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  vatNumber?: InputMaybe<SortOrderInput>;
  verificationData?: InputMaybe<SortOrderInput>;
  websiteUrl?: InputMaybe<SortOrderInput>;
  youtubeUrl?: InputMaybe<SortOrderInput>;
};

export type CompanyReference = {
  __typename?: 'CompanyReference';
  company: Company;
  companyId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  refereeCompanyName: Scalars['String']['output'];
  refereeFullName: Scalars['String']['output'];
  refereeJob: Scalars['String']['output'];
  referenceImageFile?: Maybe<File>;
  referenceImageFileId?: Maybe<Scalars['Int']['output']>;
};

export type CompanyReferenceAvgAggregate = {
  __typename?: 'CompanyReferenceAvgAggregate';
  companyId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  referenceImageFileId?: Maybe<Scalars['Float']['output']>;
};

export type CompanyReferenceCountAggregate = {
  __typename?: 'CompanyReferenceCountAggregate';
  _all: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  content: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  refereeCompanyName: Scalars['Int']['output'];
  refereeFullName: Scalars['Int']['output'];
  refereeJob: Scalars['Int']['output'];
  referenceImageFileId: Scalars['Int']['output'];
};

export type CompanyReferenceCreateInput = {
  company: CompanyCreateNestedOneWithoutCompanyReferencesInput;
  content: Scalars['String']['input'];
  refereeCompanyName: Scalars['String']['input'];
  refereeFullName: Scalars['String']['input'];
  refereeJob: Scalars['String']['input'];
  referenceImageFile?: InputMaybe<FileCreateNestedOneWithoutReferenceInput>;
};

export type CompanyReferenceCreateManyCompanyInput = {
  content: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  refereeCompanyName: Scalars['String']['input'];
  refereeFullName: Scalars['String']['input'];
  refereeJob: Scalars['String']['input'];
  referenceImageFileId?: InputMaybe<Scalars['Int']['input']>;
};

export type CompanyReferenceCreateManyCompanyInputEnvelope = {
  data: Array<CompanyReferenceCreateManyCompanyInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CompanyReferenceCreateNestedManyWithoutCompanyInput = {
  connect?: InputMaybe<Array<CompanyReferenceWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CompanyReferenceCreateOrConnectWithoutCompanyInput>>;
  create?: InputMaybe<Array<CompanyReferenceCreateWithoutCompanyInput>>;
  createMany?: InputMaybe<CompanyReferenceCreateManyCompanyInputEnvelope>;
};

export type CompanyReferenceCreateOrConnectWithoutCompanyInput = {
  create: CompanyReferenceCreateWithoutCompanyInput;
  where: CompanyReferenceWhereUniqueInput;
};

export type CompanyReferenceCreateWithoutCompanyInput = {
  content: Scalars['String']['input'];
  refereeCompanyName: Scalars['String']['input'];
  refereeFullName: Scalars['String']['input'];
  refereeJob: Scalars['String']['input'];
  referenceImageFile?: InputMaybe<FileCreateNestedOneWithoutReferenceInput>;
};

export type CompanyReferenceListRelationFilter = {
  every?: InputMaybe<CompanyReferenceWhereInput>;
  none?: InputMaybe<CompanyReferenceWhereInput>;
  some?: InputMaybe<CompanyReferenceWhereInput>;
};

export type CompanyReferenceMaxAggregate = {
  __typename?: 'CompanyReferenceMaxAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  refereeCompanyName?: Maybe<Scalars['String']['output']>;
  refereeFullName?: Maybe<Scalars['String']['output']>;
  refereeJob?: Maybe<Scalars['String']['output']>;
  referenceImageFileId?: Maybe<Scalars['Int']['output']>;
};

export type CompanyReferenceMinAggregate = {
  __typename?: 'CompanyReferenceMinAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  refereeCompanyName?: Maybe<Scalars['String']['output']>;
  refereeFullName?: Maybe<Scalars['String']['output']>;
  refereeJob?: Maybe<Scalars['String']['output']>;
  referenceImageFileId?: Maybe<Scalars['Int']['output']>;
};

export type CompanyReferenceNullableRelationFilter = {
  is?: InputMaybe<CompanyReferenceWhereInput>;
  isNot?: InputMaybe<CompanyReferenceWhereInput>;
};

export type CompanyReferenceOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CompanyReferenceOrderByWithRelationInput = {
  company?: InputMaybe<CompanyOrderByWithRelationInput>;
  companyId?: InputMaybe<SortOrder>;
  content?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  refereeCompanyName?: InputMaybe<SortOrder>;
  refereeFullName?: InputMaybe<SortOrder>;
  refereeJob?: InputMaybe<SortOrder>;
  referenceImageFile?: InputMaybe<FileOrderByWithRelationInput>;
  referenceImageFileId?: InputMaybe<SortOrderInput>;
};

export enum CompanyReferenceScalarFieldEnum {
  CompanyId = 'companyId',
  Content = 'content',
  CreatedAt = 'createdAt',
  Id = 'id',
  RefereeCompanyName = 'refereeCompanyName',
  RefereeFullName = 'refereeFullName',
  RefereeJob = 'refereeJob',
  ReferenceImageFileId = 'referenceImageFileId'
}

export type CompanyReferenceScalarWhereInput = {
  AND?: InputMaybe<Array<CompanyReferenceScalarWhereInput>>;
  NOT?: InputMaybe<Array<CompanyReferenceScalarWhereInput>>;
  OR?: InputMaybe<Array<CompanyReferenceScalarWhereInput>>;
  companyId?: InputMaybe<IntFilter>;
  content?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  refereeCompanyName?: InputMaybe<StringFilter>;
  refereeFullName?: InputMaybe<StringFilter>;
  refereeJob?: InputMaybe<StringFilter>;
  referenceImageFileId?: InputMaybe<IntNullableFilter>;
};

export type CompanyReferenceSumAggregate = {
  __typename?: 'CompanyReferenceSumAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  referenceImageFileId?: Maybe<Scalars['Int']['output']>;
};

export type CompanyReferenceUpdateInput = {
  company?: InputMaybe<CompanyUpdateOneRequiredWithoutCompanyReferencesNestedInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  refereeCompanyName?: InputMaybe<Scalars['String']['input']>;
  refereeFullName?: InputMaybe<Scalars['String']['input']>;
  refereeJob?: InputMaybe<Scalars['String']['input']>;
  referenceImageFile?: InputMaybe<FileUpdateOneWithoutReferenceNestedInput>;
};

export type CompanyReferenceUpdateManyMutationInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  refereeCompanyName?: InputMaybe<Scalars['String']['input']>;
  refereeFullName?: InputMaybe<Scalars['String']['input']>;
  refereeJob?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyReferenceUpdateManyWithWhereWithoutCompanyInput = {
  data: CompanyReferenceUpdateManyMutationInput;
  where: CompanyReferenceScalarWhereInput;
};

export type CompanyReferenceUpdateManyWithoutCompanyNestedInput = {
  connect?: InputMaybe<Array<CompanyReferenceWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CompanyReferenceCreateOrConnectWithoutCompanyInput>>;
  create?: InputMaybe<Array<CompanyReferenceCreateWithoutCompanyInput>>;
  createMany?: InputMaybe<CompanyReferenceCreateManyCompanyInputEnvelope>;
  delete?: InputMaybe<Array<CompanyReferenceWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CompanyReferenceScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CompanyReferenceWhereUniqueInput>>;
  set?: InputMaybe<Array<CompanyReferenceWhereUniqueInput>>;
  update?: InputMaybe<Array<CompanyReferenceUpdateWithWhereUniqueWithoutCompanyInput>>;
  updateMany?: InputMaybe<Array<CompanyReferenceUpdateManyWithWhereWithoutCompanyInput>>;
  upsert?: InputMaybe<Array<CompanyReferenceUpsertWithWhereUniqueWithoutCompanyInput>>;
};

export type CompanyReferenceUpdateWithWhereUniqueWithoutCompanyInput = {
  data: CompanyReferenceUpdateWithoutCompanyInput;
  where: CompanyReferenceWhereUniqueInput;
};

export type CompanyReferenceUpdateWithoutCompanyInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  refereeCompanyName?: InputMaybe<Scalars['String']['input']>;
  refereeFullName?: InputMaybe<Scalars['String']['input']>;
  refereeJob?: InputMaybe<Scalars['String']['input']>;
  referenceImageFile?: InputMaybe<FileUpdateOneWithoutReferenceNestedInput>;
};

export type CompanyReferenceUpsertWithWhereUniqueWithoutCompanyInput = {
  create: CompanyReferenceCreateWithoutCompanyInput;
  update: CompanyReferenceUpdateWithoutCompanyInput;
  where: CompanyReferenceWhereUniqueInput;
};

export type CompanyReferenceWhereInput = {
  AND?: InputMaybe<Array<CompanyReferenceWhereInput>>;
  NOT?: InputMaybe<Array<CompanyReferenceWhereInput>>;
  OR?: InputMaybe<Array<CompanyReferenceWhereInput>>;
  company?: InputMaybe<CompanyRelationFilter>;
  companyId?: InputMaybe<IntFilter>;
  content?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  refereeCompanyName?: InputMaybe<StringFilter>;
  refereeFullName?: InputMaybe<StringFilter>;
  refereeJob?: InputMaybe<StringFilter>;
  referenceImageFile?: InputMaybe<FileNullableRelationFilter>;
  referenceImageFileId?: InputMaybe<IntNullableFilter>;
};

export type CompanyReferenceWhereUniqueInput = {
  AND?: InputMaybe<Array<CompanyReferenceWhereInput>>;
  NOT?: InputMaybe<Array<CompanyReferenceWhereInput>>;
  OR?: InputMaybe<Array<CompanyReferenceWhereInput>>;
  company?: InputMaybe<CompanyRelationFilter>;
  companyId?: InputMaybe<IntFilter>;
  content?: InputMaybe<StringFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  refereeCompanyName?: InputMaybe<StringFilter>;
  refereeFullName?: InputMaybe<StringFilter>;
  refereeJob?: InputMaybe<StringFilter>;
  referenceImageFile?: InputMaybe<FileNullableRelationFilter>;
  referenceImageFileId?: InputMaybe<Scalars['Int']['input']>;
};

export type CompanyRelationFilter = {
  is?: InputMaybe<CompanyWhereInput>;
  isNot?: InputMaybe<CompanyWhereInput>;
};

export enum CompanyScalarFieldEnum {
  About = 'about',
  Active = 'active',
  AddressId = 'addressId',
  BillingAddressId = 'billingAddressId',
  BillingEmail = 'billingEmail',
  CocCountry = 'cocCountry',
  CocNumber = 'cocNumber',
  CoverImageFileId = 'coverImageFileId',
  CreatedAt = 'createdAt',
  Credits = 'credits',
  DeletedAt = 'deletedAt',
  Email = 'email',
  Id = 'id',
  LogoImageFileId = 'logoImageFileId',
  Name = 'name',
  ShowCurrentAssignments = 'showCurrentAssignments',
  ShowEmployees = 'showEmployees',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  VatNumber = 'vatNumber',
  VerificationData = 'verificationData',
  WebsiteUrl = 'websiteUrl',
  YoutubeUrl = 'youtubeUrl'
}

export type CompanyScalarWhereInput = {
  AND?: InputMaybe<Array<CompanyScalarWhereInput>>;
  NOT?: InputMaybe<Array<CompanyScalarWhereInput>>;
  OR?: InputMaybe<Array<CompanyScalarWhereInput>>;
  about?: InputMaybe<StringNullableFilter>;
  active?: InputMaybe<BoolNullableFilter>;
  addressId?: InputMaybe<IntNullableFilter>;
  billingAddressId?: InputMaybe<IntNullableFilter>;
  billingEmail?: InputMaybe<StringNullableFilter>;
  cocCountry?: InputMaybe<StringNullableFilter>;
  cocNumber?: InputMaybe<StringNullableFilter>;
  coverImageFileId?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  credits?: InputMaybe<IntFilter>;
  email?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  logoImageFileId?: InputMaybe<IntNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  showCurrentAssignments?: InputMaybe<BoolFilter>;
  showEmployees?: InputMaybe<BoolFilter>;
  type?: InputMaybe<EnumCompanyTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vatNumber?: InputMaybe<StringNullableFilter>;
  verificationData?: InputMaybe<StringNullableFilter>;
  websiteUrl?: InputMaybe<StringNullableFilter>;
  youtubeUrl?: InputMaybe<StringNullableFilter>;
};

export type CompanySumAggregate = {
  __typename?: 'CompanySumAggregate';
  addressId?: Maybe<Scalars['Int']['output']>;
  billingAddressId?: Maybe<Scalars['Int']['output']>;
  coverImageFileId?: Maybe<Scalars['Int']['output']>;
  credits?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  logoImageFileId?: Maybe<Scalars['Int']['output']>;
};

export enum CompanyType {
  Client = 'CLIENT',
  Freelancer = 'FREELANCER',
  Intermediar = 'INTERMEDIAR',
  Seconder = 'SECONDER',
  Unknown = 'UNKNOWN'
}

export type CompanyUnique_CocCompoundUniqueInput = {
  cocCountry: Scalars['String']['input'];
  cocNumber: Scalars['String']['input'];
};

export type CompanyUpdateInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  address?: InputMaybe<AddressUpdateOneWithoutCompaniesNestedInput>;
  billingAddress?: InputMaybe<AddressUpdateOneWithoutBillingCompaniesNestedInput>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  cocCountry?: InputMaybe<Scalars['String']['input']>;
  cocNumber?: InputMaybe<Scalars['String']['input']>;
  companyReferences?: InputMaybe<CompanyReferenceUpdateManyWithoutCompanyNestedInput>;
  coverImageFile?: InputMaybe<FileUpdateOneWithoutCoverImageCompaniesNestedInput>;
  credits?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  logoImageFile?: InputMaybe<FileUpdateOneWithoutLogoImageCompaniesNestedInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<ProfileUpdateOneWithoutCompanyNestedInput>;
  showCurrentAssignments?: InputMaybe<Scalars['Boolean']['input']>;
  showEmployees?: InputMaybe<Scalars['Boolean']['input']>;
  vatNumber?: InputMaybe<Scalars['String']['input']>;
  verificationData?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyUpdateManyMutationInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  cocCountry?: InputMaybe<Scalars['String']['input']>;
  cocNumber?: InputMaybe<Scalars['String']['input']>;
  credits?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  showCurrentAssignments?: InputMaybe<Scalars['Boolean']['input']>;
  showEmployees?: InputMaybe<Scalars['Boolean']['input']>;
  vatNumber?: InputMaybe<Scalars['String']['input']>;
  verificationData?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyUpdateManyWithWhereWithoutAddressInput = {
  data: CompanyUpdateManyMutationInput;
  where: CompanyScalarWhereInput;
};

export type CompanyUpdateManyWithWhereWithoutBillingAddressInput = {
  data: CompanyUpdateManyMutationInput;
  where: CompanyScalarWhereInput;
};

export type CompanyUpdateManyWithoutAddressNestedInput = {
  connect?: InputMaybe<Array<CompanyWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CompanyCreateOrConnectWithoutAddressInput>>;
  create?: InputMaybe<Array<CompanyCreateWithoutAddressInput>>;
  createMany?: InputMaybe<CompanyCreateManyAddressInputEnvelope>;
  delete?: InputMaybe<Array<CompanyWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CompanyScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CompanyWhereUniqueInput>>;
  set?: InputMaybe<Array<CompanyWhereUniqueInput>>;
  update?: InputMaybe<Array<CompanyUpdateWithWhereUniqueWithoutAddressInput>>;
  updateMany?: InputMaybe<Array<CompanyUpdateManyWithWhereWithoutAddressInput>>;
  upsert?: InputMaybe<Array<CompanyUpsertWithWhereUniqueWithoutAddressInput>>;
};

export type CompanyUpdateManyWithoutBillingAddressNestedInput = {
  connect?: InputMaybe<Array<CompanyWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<CompanyCreateOrConnectWithoutBillingAddressInput>>;
  create?: InputMaybe<Array<CompanyCreateWithoutBillingAddressInput>>;
  createMany?: InputMaybe<CompanyCreateManyBillingAddressInputEnvelope>;
  delete?: InputMaybe<Array<CompanyWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CompanyScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CompanyWhereUniqueInput>>;
  set?: InputMaybe<Array<CompanyWhereUniqueInput>>;
  update?: InputMaybe<Array<CompanyUpdateWithWhereUniqueWithoutBillingAddressInput>>;
  updateMany?: InputMaybe<Array<CompanyUpdateManyWithWhereWithoutBillingAddressInput>>;
  upsert?: InputMaybe<Array<CompanyUpsertWithWhereUniqueWithoutBillingAddressInput>>;
};

export type CompanyUpdateOneRequiredWithoutCompanyReferencesNestedInput = {
  connect?: InputMaybe<CompanyWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CompanyCreateOrConnectWithoutCompanyReferencesInput>;
  create?: InputMaybe<CompanyCreateWithoutCompanyReferencesInput>;
  update?: InputMaybe<CompanyUpdateToOneWithWhereWithoutCompanyReferencesInput>;
  upsert?: InputMaybe<CompanyUpsertWithoutCompanyReferencesInput>;
};

export type CompanyUpdateToOneWithWhereWithoutCompanyReferencesInput = {
  data: CompanyUpdateWithoutCompanyReferencesInput;
  where?: InputMaybe<CompanyWhereInput>;
};

export type CompanyUpdateWithWhereUniqueWithoutAddressInput = {
  data: CompanyUpdateWithoutAddressInput;
  where: CompanyWhereUniqueInput;
};

export type CompanyUpdateWithWhereUniqueWithoutBillingAddressInput = {
  data: CompanyUpdateWithoutBillingAddressInput;
  where: CompanyWhereUniqueInput;
};

export type CompanyUpdateWithoutAddressInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  billingAddress?: InputMaybe<AddressUpdateOneWithoutBillingCompaniesNestedInput>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  cocCountry?: InputMaybe<Scalars['String']['input']>;
  cocNumber?: InputMaybe<Scalars['String']['input']>;
  companyReferences?: InputMaybe<CompanyReferenceUpdateManyWithoutCompanyNestedInput>;
  coverImageFile?: InputMaybe<FileUpdateOneWithoutCoverImageCompaniesNestedInput>;
  credits?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  logoImageFile?: InputMaybe<FileUpdateOneWithoutLogoImageCompaniesNestedInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<ProfileUpdateOneWithoutCompanyNestedInput>;
  showCurrentAssignments?: InputMaybe<Scalars['Boolean']['input']>;
  showEmployees?: InputMaybe<Scalars['Boolean']['input']>;
  vatNumber?: InputMaybe<Scalars['String']['input']>;
  verificationData?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyUpdateWithoutBillingAddressInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  address?: InputMaybe<AddressUpdateOneWithoutCompaniesNestedInput>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  cocCountry?: InputMaybe<Scalars['String']['input']>;
  cocNumber?: InputMaybe<Scalars['String']['input']>;
  companyReferences?: InputMaybe<CompanyReferenceUpdateManyWithoutCompanyNestedInput>;
  coverImageFile?: InputMaybe<FileUpdateOneWithoutCoverImageCompaniesNestedInput>;
  credits?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  logoImageFile?: InputMaybe<FileUpdateOneWithoutLogoImageCompaniesNestedInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<ProfileUpdateOneWithoutCompanyNestedInput>;
  showCurrentAssignments?: InputMaybe<Scalars['Boolean']['input']>;
  showEmployees?: InputMaybe<Scalars['Boolean']['input']>;
  vatNumber?: InputMaybe<Scalars['String']['input']>;
  verificationData?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyUpdateWithoutCompanyReferencesInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  address?: InputMaybe<AddressUpdateOneWithoutCompaniesNestedInput>;
  billingAddress?: InputMaybe<AddressUpdateOneWithoutBillingCompaniesNestedInput>;
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  cocCountry?: InputMaybe<Scalars['String']['input']>;
  cocNumber?: InputMaybe<Scalars['String']['input']>;
  coverImageFile?: InputMaybe<FileUpdateOneWithoutCoverImageCompaniesNestedInput>;
  credits?: InputMaybe<Scalars['Int']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  logoImageFile?: InputMaybe<FileUpdateOneWithoutLogoImageCompaniesNestedInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<ProfileUpdateOneWithoutCompanyNestedInput>;
  showCurrentAssignments?: InputMaybe<Scalars['Boolean']['input']>;
  showEmployees?: InputMaybe<Scalars['Boolean']['input']>;
  vatNumber?: InputMaybe<Scalars['String']['input']>;
  verificationData?: InputMaybe<Scalars['String']['input']>;
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  youtubeUrl?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyUpsertWithWhereUniqueWithoutAddressInput = {
  create: CompanyCreateWithoutAddressInput;
  update: CompanyUpdateWithoutAddressInput;
  where: CompanyWhereUniqueInput;
};

export type CompanyUpsertWithWhereUniqueWithoutBillingAddressInput = {
  create: CompanyCreateWithoutBillingAddressInput;
  update: CompanyUpdateWithoutBillingAddressInput;
  where: CompanyWhereUniqueInput;
};

export type CompanyUpsertWithoutCompanyReferencesInput = {
  create: CompanyCreateWithoutCompanyReferencesInput;
  update: CompanyUpdateWithoutCompanyReferencesInput;
  where?: InputMaybe<CompanyWhereInput>;
};

export type CompanyWhereInput = {
  AND?: InputMaybe<Array<CompanyWhereInput>>;
  NOT?: InputMaybe<Array<CompanyWhereInput>>;
  OR?: InputMaybe<Array<CompanyWhereInput>>;
  about?: InputMaybe<StringNullableFilter>;
  active?: InputMaybe<BoolNullableFilter>;
  address?: InputMaybe<AddressNullableRelationFilter>;
  addressId?: InputMaybe<IntNullableFilter>;
  billingAddress?: InputMaybe<AddressNullableRelationFilter>;
  billingAddressId?: InputMaybe<IntNullableFilter>;
  billingEmail?: InputMaybe<StringNullableFilter>;
  cocCountry?: InputMaybe<StringNullableFilter>;
  cocNumber?: InputMaybe<StringNullableFilter>;
  companyReferences?: InputMaybe<CompanyReferenceListRelationFilter>;
  coverImageFile?: InputMaybe<FileNullableRelationFilter>;
  coverImageFileId?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  credits?: InputMaybe<IntFilter>;
  email?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  logoImageFile?: InputMaybe<FileNullableRelationFilter>;
  logoImageFileId?: InputMaybe<IntNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  profile?: InputMaybe<ProfileNullableRelationFilter>;
  showCurrentAssignments?: InputMaybe<BoolFilter>;
  showEmployees?: InputMaybe<BoolFilter>;
  type?: InputMaybe<EnumCompanyTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vatNumber?: InputMaybe<StringNullableFilter>;
  verificationData?: InputMaybe<StringNullableFilter>;
  websiteUrl?: InputMaybe<StringNullableFilter>;
  youtubeUrl?: InputMaybe<StringNullableFilter>;
};

export type CompanyWhereUniqueInput = {
  AND?: InputMaybe<Array<CompanyWhereInput>>;
  NOT?: InputMaybe<Array<CompanyWhereInput>>;
  OR?: InputMaybe<Array<CompanyWhereInput>>;
  about?: InputMaybe<StringNullableFilter>;
  active?: InputMaybe<BoolNullableFilter>;
  address?: InputMaybe<AddressNullableRelationFilter>;
  addressId?: InputMaybe<IntNullableFilter>;
  billingAddress?: InputMaybe<AddressNullableRelationFilter>;
  billingAddressId?: InputMaybe<IntNullableFilter>;
  billingEmail?: InputMaybe<StringNullableFilter>;
  cocCountry?: InputMaybe<StringNullableFilter>;
  cocNumber?: InputMaybe<StringNullableFilter>;
  companyReferences?: InputMaybe<CompanyReferenceListRelationFilter>;
  coverImageFile?: InputMaybe<FileNullableRelationFilter>;
  coverImageFileId?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  credits?: InputMaybe<IntFilter>;
  email?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  logoImageFile?: InputMaybe<FileNullableRelationFilter>;
  logoImageFileId?: InputMaybe<IntNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  profile?: InputMaybe<ProfileNullableRelationFilter>;
  showCurrentAssignments?: InputMaybe<BoolFilter>;
  showEmployees?: InputMaybe<BoolFilter>;
  type?: InputMaybe<EnumCompanyTypeFilter>;
  unique_coc?: InputMaybe<CompanyUnique_CocCompoundUniqueInput>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  vatNumber?: InputMaybe<StringNullableFilter>;
  verificationData?: InputMaybe<StringNullableFilter>;
  websiteUrl?: InputMaybe<StringNullableFilter>;
  youtubeUrl?: InputMaybe<StringNullableFilter>;
};

export type ConfirmInviteOutput = {
  __typename?: 'ConfirmInviteOutput';
  idToken: Scalars['String']['output'];
  permissionsByCompany: Array<PermissionsByCompanyId>;
  refreshToken: Scalars['String']['output'];
};

export type ConfirmOutput = {
  __typename?: 'ConfirmOutput';
  idToken: Scalars['String']['output'];
  permissionsByCompany: Array<PermissionsByCompanyId>;
  refreshToken: Scalars['String']['output'];
};

export type Contract = {
  __typename?: 'Contract';
  companyId: Scalars['Int']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  externalProviderId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invoiceId?: Maybe<Scalars['String']['output']>;
  plan: Plan;
  planId: Scalars['Int']['output'];
  renewalInterval?: Maybe<RenewalInterval>;
  startDate: Scalars['DateTime']['output'];
  subscription?: Maybe<StripeSubscription>;
  subscriptionExpireDate?: Maybe<Scalars['DateTime']['output']>;
  usageAmount?: Maybe<Scalars['Int']['output']>;
  usageInterval?: Maybe<Interval>;
  usageIntervalCount?: Maybe<Scalars['Int']['output']>;
  usageType: UsageType;
};

export type ContractAvgAggregate = {
  __typename?: 'ContractAvgAggregate';
  companyId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  planId?: Maybe<Scalars['Float']['output']>;
  usageAmount?: Maybe<Scalars['Float']['output']>;
  usageIntervalCount?: Maybe<Scalars['Float']['output']>;
};

export type ContractCountAggregate = {
  __typename?: 'ContractCountAggregate';
  _all: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  endDate: Scalars['Int']['output'];
  externalProviderId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  invoiceId: Scalars['Int']['output'];
  planId: Scalars['Int']['output'];
  renewalInterval: Scalars['Int']['output'];
  startDate: Scalars['Int']['output'];
  subscriptionExpireDate: Scalars['Int']['output'];
  usageAmount: Scalars['Int']['output'];
  usageInterval: Scalars['Int']['output'];
  usageIntervalCount: Scalars['Int']['output'];
  usageType: Scalars['Int']['output'];
};

export type ContractListRelationFilter = {
  every?: InputMaybe<ContractWhereInput>;
  none?: InputMaybe<ContractWhereInput>;
  some?: InputMaybe<ContractWhereInput>;
};

export type ContractMaxAggregate = {
  __typename?: 'ContractMaxAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  externalProviderId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  invoiceId?: Maybe<Scalars['String']['output']>;
  planId?: Maybe<Scalars['Int']['output']>;
  renewalInterval?: Maybe<RenewalInterval>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  subscriptionExpireDate?: Maybe<Scalars['DateTime']['output']>;
  usageAmount?: Maybe<Scalars['Int']['output']>;
  usageInterval?: Maybe<Interval>;
  usageIntervalCount?: Maybe<Scalars['Int']['output']>;
  usageType?: Maybe<UsageType>;
};

export type ContractMinAggregate = {
  __typename?: 'ContractMinAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  externalProviderId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  invoiceId?: Maybe<Scalars['String']['output']>;
  planId?: Maybe<Scalars['Int']['output']>;
  renewalInterval?: Maybe<RenewalInterval>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  subscriptionExpireDate?: Maybe<Scalars['DateTime']['output']>;
  usageAmount?: Maybe<Scalars['Int']['output']>;
  usageInterval?: Maybe<Interval>;
  usageIntervalCount?: Maybe<Scalars['Int']['output']>;
  usageType?: Maybe<UsageType>;
};

export type ContractOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ContractOrderByWithRelationInput = {
  companyId?: InputMaybe<SortOrder>;
  endDate?: InputMaybe<SortOrderInput>;
  externalProviderId?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  invoiceId?: InputMaybe<SortOrderInput>;
  plan?: InputMaybe<PlanOrderByWithRelationInput>;
  planId?: InputMaybe<SortOrder>;
  renewalInterval?: InputMaybe<SortOrderInput>;
  startDate?: InputMaybe<SortOrder>;
  subscriptionExpireDate?: InputMaybe<SortOrderInput>;
  usageAmount?: InputMaybe<SortOrderInput>;
  usageInterval?: InputMaybe<SortOrderInput>;
  usageIntervalCount?: InputMaybe<SortOrderInput>;
  usageType?: InputMaybe<SortOrder>;
};

export enum ContractScalarFieldEnum {
  CompanyId = 'companyId',
  EndDate = 'endDate',
  ExternalProviderId = 'externalProviderId',
  Id = 'id',
  InvoiceId = 'invoiceId',
  PlanId = 'planId',
  RenewalInterval = 'renewalInterval',
  StartDate = 'startDate',
  SubscriptionExpireDate = 'subscriptionExpireDate',
  UsageAmount = 'usageAmount',
  UsageInterval = 'usageInterval',
  UsageIntervalCount = 'usageIntervalCount',
  UsageType = 'usageType'
}

export type ContractSumAggregate = {
  __typename?: 'ContractSumAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  planId?: Maybe<Scalars['Int']['output']>;
  usageAmount?: Maybe<Scalars['Int']['output']>;
  usageIntervalCount?: Maybe<Scalars['Int']['output']>;
};

export enum ContractType {
  Freelance = 'FREELANCE',
  Interim = 'INTERIM',
  Other = 'OTHER',
  Parttime = 'PARTTIME',
  Payroll = 'PAYROLL'
}

export type ContractUpdateInput = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  externalProviderId?: InputMaybe<Scalars['String']['input']>;
  invoiceId?: InputMaybe<Scalars['String']['input']>;
  plan?: InputMaybe<PlanUpdateOneRequiredWithoutContractsNestedInput>;
  renewalInterval?: InputMaybe<RenewalInterval>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  subscriptionExpireDate?: InputMaybe<Scalars['DateTime']['input']>;
  usageAmount?: InputMaybe<Scalars['Int']['input']>;
  usageInterval?: InputMaybe<Interval>;
  usageIntervalCount?: InputMaybe<Scalars['Int']['input']>;
  usageType?: InputMaybe<UsageType>;
};

export type ContractWhereInput = {
  AND?: InputMaybe<Array<ContractWhereInput>>;
  NOT?: InputMaybe<Array<ContractWhereInput>>;
  OR?: InputMaybe<Array<ContractWhereInput>>;
  companyId?: InputMaybe<IntFilter>;
  endDate?: InputMaybe<DateTimeNullableFilter>;
  externalProviderId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  invoiceId?: InputMaybe<StringNullableFilter>;
  plan?: InputMaybe<PlanRelationFilter>;
  planId?: InputMaybe<IntFilter>;
  renewalInterval?: InputMaybe<EnumRenewalIntervalNullableFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  subscriptionExpireDate?: InputMaybe<DateTimeNullableFilter>;
  usageAmount?: InputMaybe<IntNullableFilter>;
  usageInterval?: InputMaybe<EnumIntervalNullableFilter>;
  usageIntervalCount?: InputMaybe<IntNullableFilter>;
  usageType?: InputMaybe<EnumUsageTypeFilter>;
};

export type ContractWhereUniqueInput = {
  AND?: InputMaybe<Array<ContractWhereInput>>;
  NOT?: InputMaybe<Array<ContractWhereInput>>;
  OR?: InputMaybe<Array<ContractWhereInput>>;
  companyId?: InputMaybe<IntFilter>;
  endDate?: InputMaybe<DateTimeNullableFilter>;
  externalProviderId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  invoiceId?: InputMaybe<StringNullableFilter>;
  plan?: InputMaybe<PlanRelationFilter>;
  planId?: InputMaybe<IntFilter>;
  renewalInterval?: InputMaybe<EnumRenewalIntervalNullableFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  subscriptionExpireDate?: InputMaybe<DateTimeNullableFilter>;
  usageAmount?: InputMaybe<IntNullableFilter>;
  usageInterval?: InputMaybe<EnumIntervalNullableFilter>;
  usageIntervalCount?: InputMaybe<IntNullableFilter>;
  usageType?: InputMaybe<EnumUsageTypeFilter>;
};

export type CreateContractOutput = {
  __typename?: 'CreateContractOutput';
  success: Scalars['Boolean']['output'];
};

export type Credit = {
  __typename?: 'Credit';
  amount: Scalars['Int']['output'];
  contractAmount: Scalars['Int']['output'];
  contractEndDate?: Maybe<Scalars['DateTime']['output']>;
  contractStartDate?: Maybe<Scalars['DateTime']['output']>;
  productSlug?: Maybe<Scalars['String']['output']>;
  refreshDate?: Maybe<Scalars['DateTime']['output']>;
  usageType: Scalars['String']['output'];
};

export type CustomContractCreateInput = {
  companyId: Scalars['Int']['input'];
  endDate?: InputMaybe<Scalars['String']['input']>;
  planId: Scalars['Int']['input'];
  renewalInterval?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  usageAmount?: InputMaybe<Scalars['Int']['input']>;
  usageInterval?: InputMaybe<Scalars['String']['input']>;
};

export enum CustomerRelation {
  First = 'FIRST',
  Other = 'OTHER',
  Second = 'SECOND',
  Self = 'SELF'
}

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DeclineAssignment = {
  assignmentId: Scalars['Float']['input'];
  declineReason: Scalars['String']['input'];
};

export type DownloadLink = {
  __typename?: 'DownloadLink';
  blobName: Scalars['String']['output'];
  expiresOn?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
};

export enum DurationType {
  Day = 'DAY',
  Month = 'MONTH',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type EndProContractOutput = {
  __typename?: 'EndProContractOutput';
  isSuccessful: Scalars['Boolean']['output'];
};

export type EnumAssignmentApplicationStatusFilter = {
  equals?: InputMaybe<AssignmentApplicationStatus>;
  in?: InputMaybe<Array<AssignmentApplicationStatus>>;
  not?: InputMaybe<NestedEnumAssignmentApplicationStatusFilter>;
  notIn?: InputMaybe<Array<AssignmentApplicationStatus>>;
};

export type EnumAssignmentSourceFilter = {
  equals?: InputMaybe<AssignmentSource>;
  in?: InputMaybe<Array<AssignmentSource>>;
  not?: InputMaybe<NestedEnumAssignmentSourceFilter>;
  notIn?: InputMaybe<Array<AssignmentSource>>;
};

export type EnumAssignmentStatusNullableFilter = {
  equals?: InputMaybe<AssignmentStatus>;
  in?: InputMaybe<Array<AssignmentStatus>>;
  not?: InputMaybe<NestedEnumAssignmentStatusNullableFilter>;
  notIn?: InputMaybe<Array<AssignmentStatus>>;
};

export type EnumAssignmentTypeNullableFilter = {
  equals?: InputMaybe<AssignmentType>;
  in?: InputMaybe<Array<AssignmentType>>;
  not?: InputMaybe<NestedEnumAssignmentTypeNullableFilter>;
  notIn?: InputMaybe<Array<AssignmentType>>;
};

export type EnumAvailabilityNullableFilter = {
  equals?: InputMaybe<Availability>;
  in?: InputMaybe<Array<Availability>>;
  not?: InputMaybe<NestedEnumAvailabilityNullableFilter>;
  notIn?: InputMaybe<Array<Availability>>;
};

export type EnumCompanyTypeFilter = {
  equals?: InputMaybe<CompanyType>;
  in?: InputMaybe<Array<CompanyType>>;
  not?: InputMaybe<NestedEnumCompanyTypeFilter>;
  notIn?: InputMaybe<Array<CompanyType>>;
};

export type EnumContractTypeNullableFilter = {
  equals?: InputMaybe<ContractType>;
  in?: InputMaybe<Array<ContractType>>;
  not?: InputMaybe<NestedEnumContractTypeNullableFilter>;
  notIn?: InputMaybe<Array<ContractType>>;
};

export type EnumCustomerRelationNullableFilter = {
  equals?: InputMaybe<CustomerRelation>;
  in?: InputMaybe<Array<CustomerRelation>>;
  not?: InputMaybe<NestedEnumCustomerRelationNullableFilter>;
  notIn?: InputMaybe<Array<CustomerRelation>>;
};

export type EnumDurationTypeNullableFilter = {
  equals?: InputMaybe<DurationType>;
  in?: InputMaybe<Array<DurationType>>;
  not?: InputMaybe<NestedEnumDurationTypeNullableFilter>;
  notIn?: InputMaybe<Array<DurationType>>;
};

export type EnumExpertiseTypeFilter = {
  equals?: InputMaybe<ExpertiseType>;
  in?: InputMaybe<Array<ExpertiseType>>;
  not?: InputMaybe<NestedEnumExpertiseTypeFilter>;
  notIn?: InputMaybe<Array<ExpertiseType>>;
};

export type EnumIntervalNullableFilter = {
  equals?: InputMaybe<Interval>;
  in?: InputMaybe<Array<Interval>>;
  not?: InputMaybe<NestedEnumIntervalNullableFilter>;
  notIn?: InputMaybe<Array<Interval>>;
};

export type EnumLinkTypeFilter = {
  equals?: InputMaybe<LinkType>;
  in?: InputMaybe<Array<LinkType>>;
  not?: InputMaybe<NestedEnumLinkTypeFilter>;
  notIn?: InputMaybe<Array<LinkType>>;
};

export type EnumModeTypeNullableFilter = {
  equals?: InputMaybe<ModeType>;
  in?: InputMaybe<Array<ModeType>>;
  not?: InputMaybe<NestedEnumModeTypeNullableFilter>;
  notIn?: InputMaybe<Array<ModeType>>;
};

export type EnumNotificationTypeFilter = {
  equals?: InputMaybe<NotificationType>;
  in?: InputMaybe<Array<NotificationType>>;
  not?: InputMaybe<NestedEnumNotificationTypeFilter>;
  notIn?: InputMaybe<Array<NotificationType>>;
};

export type EnumOnLocationNullableFilter = {
  equals?: InputMaybe<OnLocation>;
  in?: InputMaybe<Array<OnLocation>>;
  not?: InputMaybe<NestedEnumOnLocationNullableFilter>;
  notIn?: InputMaybe<Array<OnLocation>>;
};

export type EnumProductSlugFilter = {
  equals?: InputMaybe<ProductSlug>;
  in?: InputMaybe<Array<ProductSlug>>;
  not?: InputMaybe<NestedEnumProductSlugFilter>;
  notIn?: InputMaybe<Array<ProductSlug>>;
};

export type EnumRateTypeNullableFilter = {
  equals?: InputMaybe<RateType>;
  in?: InputMaybe<Array<RateType>>;
  not?: InputMaybe<NestedEnumRateTypeNullableFilter>;
  notIn?: InputMaybe<Array<RateType>>;
};

export type EnumRenewalIntervalNullableFilter = {
  equals?: InputMaybe<RenewalInterval>;
  in?: InputMaybe<Array<RenewalInterval>>;
  not?: InputMaybe<NestedEnumRenewalIntervalNullableFilter>;
  notIn?: InputMaybe<Array<RenewalInterval>>;
};

export type EnumReviewTypeFilter = {
  equals?: InputMaybe<ReviewType>;
  in?: InputMaybe<Array<ReviewType>>;
  not?: InputMaybe<NestedEnumReviewTypeFilter>;
  notIn?: InputMaybe<Array<ReviewType>>;
};

export type EnumSavedSearchTypeNullableFilter = {
  equals?: InputMaybe<SavedSearchType>;
  in?: InputMaybe<Array<SavedSearchType>>;
  not?: InputMaybe<NestedEnumSavedSearchTypeNullableFilter>;
  notIn?: InputMaybe<Array<SavedSearchType>>;
};

export type EnumStatusModelTypeFilter = {
  equals?: InputMaybe<StatusModelType>;
  in?: InputMaybe<Array<StatusModelType>>;
  not?: InputMaybe<NestedEnumStatusModelTypeFilter>;
  notIn?: InputMaybe<Array<StatusModelType>>;
};

export type EnumUsageTypeFilter = {
  equals?: InputMaybe<UsageType>;
  in?: InputMaybe<Array<UsageType>>;
  not?: InputMaybe<NestedEnumUsageTypeFilter>;
  notIn?: InputMaybe<Array<UsageType>>;
};

export type EnumUserCompanyRoleFilter = {
  equals?: InputMaybe<UserCompanyRole>;
  in?: InputMaybe<Array<UserCompanyRole>>;
  not?: InputMaybe<NestedEnumUserCompanyRoleFilter>;
  notIn?: InputMaybe<Array<UserCompanyRole>>;
};

export enum ExpertiseType {
  Administration = 'ADMINISTRATION',
  AnalyticsBiBigData = 'ANALYTICS_BI_BIG_DATA',
  AudioAndVideo = 'AUDIO_AND_VIDEO',
  CivilEngineering = 'CIVIL_ENGINEERING',
  Communication = 'COMMUNICATION',
  CommunicationAndMedia = 'COMMUNICATION_AND_MEDIA',
  ComplianceAndRegulatoryEnforcement = 'COMPLIANCE_AND_REGULATORY_ENFORCEMENT',
  ConstructionAndManufacturingConsulting = 'CONSTRUCTION_AND_MANUFACTURING_CONSULTING',
  ConstructionAndManufacturingExecution = 'CONSTRUCTION_AND_MANUFACTURING_EXECUTION',
  DeploymentAndOperations = 'DEPLOYMENT_AND_OPERATIONS',
  DesignOfPhysicalObjects = 'DESIGN_OF_PHYSICAL_OBJECTS',
  DevelopmentAndImplementation = 'DEVELOPMENT_AND_IMPLEMENTATION',
  FacilitiesManagement = 'FACILITIES_MANAGEMENT',
  Finance = 'FINANCE',
  GovernmentPolicyFormulationAndExecution = 'GOVERNMENT_POLICY_FORMULATION_AND_EXECUTION',
  Healthcare = 'HEALTHCARE',
  HumanResources = 'HUMAN_RESOURCES',
  Ict = 'ICT',
  InterimManagement = 'INTERIM_MANAGEMENT',
  LegalAndTax = 'LEGAL_AND_TAX',
  LogisticsAndSupplyChainManagement = 'LOGISTICS_AND_SUPPLY_CHAIN_MANAGEMENT',
  ManagementAndOrganization = 'MANAGEMENT_AND_ORGANIZATION',
  MarketingAndSales = 'MARKETING_AND_SALES',
  Other = 'OTHER',
  Procurement = 'PROCUREMENT',
  ProjectManagement = 'PROJECT_MANAGEMENT',
  QualityAndOperations = 'QUALITY_AND_OPERATIONS',
  Research = 'RESEARCH',
  SocialWork = 'SOCIAL_WORK',
  SportHospitalityAndRecreation = 'SPORT_HOSPITALITY_AND_RECREATION',
  Strategy = 'STRATEGY',
  StrategyAndArchitecture = 'STRATEGY_AND_ARCHITECTURE',
  SupportAndProjectAssistance = 'SUPPORT_AND_PROJECT_ASSISTANCE',
  SystemIntegration = 'SYSTEM_INTEGRATION',
  Technology = 'TECHNOLOGY',
  Testing = 'TESTING',
  TextAndTranslation = 'TEXT_AND_TRANSLATION',
  TrainingAndEducation = 'TRAINING_AND_EDUCATION',
  UserInteractionAndUx = 'USER_INTERACTION_AND_UX',
  VisualDesignAndPhotography = 'VISUAL_DESIGN_AND_PHOTOGRAPHY'
}

export type ExternalProviderCompany = {
  __typename?: 'ExternalProviderCompany';
  _count: ExternalProviderCompanyCount;
  checkout?: Maybe<Array<Checkout>>;
  companyId: Scalars['ID']['output'];
  externalProviderId?: Maybe<Scalars['String']['output']>;
};

export type ExternalProviderCompanyAvgAggregate = {
  __typename?: 'ExternalProviderCompanyAvgAggregate';
  companyId?: Maybe<Scalars['Float']['output']>;
};

export type ExternalProviderCompanyCount = {
  __typename?: 'ExternalProviderCompanyCount';
  checkout: Scalars['Int']['output'];
};

export type ExternalProviderCompanyCountAggregate = {
  __typename?: 'ExternalProviderCompanyCountAggregate';
  _all: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  externalProviderId: Scalars['Int']['output'];
};

export type ExternalProviderCompanyCreateNestedOneWithoutCheckoutInput = {
  connect?: InputMaybe<ExternalProviderCompanyWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ExternalProviderCompanyCreateOrConnectWithoutCheckoutInput>;
  create?: InputMaybe<ExternalProviderCompanyCreateWithoutCheckoutInput>;
};

export type ExternalProviderCompanyCreateOrConnectWithoutCheckoutInput = {
  create: ExternalProviderCompanyCreateWithoutCheckoutInput;
  where: ExternalProviderCompanyWhereUniqueInput;
};

export type ExternalProviderCompanyCreateWithoutCheckoutInput = {
  companyId: Scalars['Int']['input'];
  externalProviderId?: InputMaybe<Scalars['String']['input']>;
};

export type ExternalProviderCompanyMaxAggregate = {
  __typename?: 'ExternalProviderCompanyMaxAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  externalProviderId?: Maybe<Scalars['String']['output']>;
};

export type ExternalProviderCompanyMinAggregate = {
  __typename?: 'ExternalProviderCompanyMinAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  externalProviderId?: Maybe<Scalars['String']['output']>;
};

export type ExternalProviderCompanyOrderByWithRelationInput = {
  checkout?: InputMaybe<CheckoutOrderByRelationAggregateInput>;
  companyId?: InputMaybe<SortOrder>;
  externalProviderId?: InputMaybe<SortOrderInput>;
};

export type ExternalProviderCompanyRelationFilter = {
  is?: InputMaybe<ExternalProviderCompanyWhereInput>;
  isNot?: InputMaybe<ExternalProviderCompanyWhereInput>;
};

export type ExternalProviderCompanySumAggregate = {
  __typename?: 'ExternalProviderCompanySumAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
};

export type ExternalProviderCompanyUpdateOneRequiredWithoutCheckoutNestedInput = {
  connect?: InputMaybe<ExternalProviderCompanyWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ExternalProviderCompanyCreateOrConnectWithoutCheckoutInput>;
  create?: InputMaybe<ExternalProviderCompanyCreateWithoutCheckoutInput>;
  update?: InputMaybe<ExternalProviderCompanyUpdateToOneWithWhereWithoutCheckoutInput>;
  upsert?: InputMaybe<ExternalProviderCompanyUpsertWithoutCheckoutInput>;
};

export type ExternalProviderCompanyUpdateToOneWithWhereWithoutCheckoutInput = {
  data: ExternalProviderCompanyUpdateWithoutCheckoutInput;
  where?: InputMaybe<ExternalProviderCompanyWhereInput>;
};

export type ExternalProviderCompanyUpdateWithoutCheckoutInput = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
  externalProviderId?: InputMaybe<Scalars['String']['input']>;
};

export type ExternalProviderCompanyUpsertWithoutCheckoutInput = {
  create: ExternalProviderCompanyCreateWithoutCheckoutInput;
  update: ExternalProviderCompanyUpdateWithoutCheckoutInput;
  where?: InputMaybe<ExternalProviderCompanyWhereInput>;
};

export type ExternalProviderCompanyWhereInput = {
  AND?: InputMaybe<Array<ExternalProviderCompanyWhereInput>>;
  NOT?: InputMaybe<Array<ExternalProviderCompanyWhereInput>>;
  OR?: InputMaybe<Array<ExternalProviderCompanyWhereInput>>;
  checkout?: InputMaybe<CheckoutListRelationFilter>;
  companyId?: InputMaybe<IntFilter>;
  externalProviderId?: InputMaybe<StringNullableFilter>;
};

export type ExternalProviderCompanyWhereUniqueInput = {
  AND?: InputMaybe<Array<ExternalProviderCompanyWhereInput>>;
  NOT?: InputMaybe<Array<ExternalProviderCompanyWhereInput>>;
  OR?: InputMaybe<Array<ExternalProviderCompanyWhereInput>>;
  checkout?: InputMaybe<CheckoutListRelationFilter>;
  companyId?: InputMaybe<Scalars['Int']['input']>;
  externalProviderId?: InputMaybe<Scalars['String']['input']>;
};

export type File = {
  __typename?: 'File';
  _count: FileCount;
  applicationProfileFiles?: Maybe<Array<ApplicationProfileFile>>;
  assignmentApplications?: Maybe<Array<AssignmentApplicationFile>>;
  blobName: Scalars['String']['output'];
  container: Scalars['String']['output'];
  coverImageCompanies?: Maybe<Array<Company>>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  logoImageCompanies?: Maybe<Array<Company>>;
  name: Scalars['String']['output'];
  owner?: Maybe<User>;
  ownerId?: Maybe<Scalars['Int']['output']>;
  reference?: Maybe<CompanyReference>;
  size?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  uuid: Scalars['String']['output'];
};

export type FileAvgAggregate = {
  __typename?: 'FileAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  ownerId?: Maybe<Scalars['Float']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
};

export type FileCount = {
  __typename?: 'FileCount';
  applicationProfileFiles: Scalars['Int']['output'];
  assignmentApplications: Scalars['Int']['output'];
  coverImageCompanies: Scalars['Int']['output'];
  logoImageCompanies: Scalars['Int']['output'];
};

export type FileCountAggregate = {
  __typename?: 'FileCountAggregate';
  _all: Scalars['Int']['output'];
  blobName: Scalars['Int']['output'];
  container: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  deletedAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  ownerId: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  uuid: Scalars['Int']['output'];
};

export type FileCreateInput = {
  blobName: Scalars['String']['input'];
  container: Scalars['String']['input'];
  name: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type FileCreateNestedOneWithoutApplicationProfileFilesInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutApplicationProfileFilesInput>;
  create?: InputMaybe<FileCreateWithoutApplicationProfileFilesInput>;
};

export type FileCreateNestedOneWithoutAssignmentApplicationsInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutAssignmentApplicationsInput>;
  create?: InputMaybe<FileCreateWithoutAssignmentApplicationsInput>;
};

export type FileCreateNestedOneWithoutCoverImageCompaniesInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutCoverImageCompaniesInput>;
  create?: InputMaybe<FileCreateWithoutCoverImageCompaniesInput>;
};

export type FileCreateNestedOneWithoutLogoImageCompaniesInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutLogoImageCompaniesInput>;
  create?: InputMaybe<FileCreateWithoutLogoImageCompaniesInput>;
};

export type FileCreateNestedOneWithoutReferenceInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutReferenceInput>;
  create?: InputMaybe<FileCreateWithoutReferenceInput>;
};

export type FileCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<FileCreateWithoutUserInput>;
};

export type FileCreateOrConnectWithoutApplicationProfileFilesInput = {
  create: FileCreateWithoutApplicationProfileFilesInput;
  where: FileWhereUniqueInput;
};

export type FileCreateOrConnectWithoutAssignmentApplicationsInput = {
  create: FileCreateWithoutAssignmentApplicationsInput;
  where: FileWhereUniqueInput;
};

export type FileCreateOrConnectWithoutCoverImageCompaniesInput = {
  create: FileCreateWithoutCoverImageCompaniesInput;
  where: FileWhereUniqueInput;
};

export type FileCreateOrConnectWithoutLogoImageCompaniesInput = {
  create: FileCreateWithoutLogoImageCompaniesInput;
  where: FileWhereUniqueInput;
};

export type FileCreateOrConnectWithoutReferenceInput = {
  create: FileCreateWithoutReferenceInput;
  where: FileWhereUniqueInput;
};

export type FileCreateOrConnectWithoutUserInput = {
  create: FileCreateWithoutUserInput;
  where: FileWhereUniqueInput;
};

export type FileCreateWithoutApplicationProfileFilesInput = {
  blobName: Scalars['String']['input'];
  container: Scalars['String']['input'];
  name: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type FileCreateWithoutAssignmentApplicationsInput = {
  blobName: Scalars['String']['input'];
  container: Scalars['String']['input'];
  name: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type FileCreateWithoutCoverImageCompaniesInput = {
  blobName: Scalars['String']['input'];
  container: Scalars['String']['input'];
  name: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type FileCreateWithoutLogoImageCompaniesInput = {
  blobName: Scalars['String']['input'];
  container: Scalars['String']['input'];
  name: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type FileCreateWithoutReferenceInput = {
  blobName: Scalars['String']['input'];
  container: Scalars['String']['input'];
  name: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type FileCreateWithoutUserInput = {
  blobName: Scalars['String']['input'];
  container: Scalars['String']['input'];
  name: Scalars['String']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type FileInputData = {
  blobName: Scalars['String']['input'];
  container?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  size: Scalars['Int']['input'];
};

export type FileIsOwner = {
  __typename?: 'FileIsOwner';
  isOwner: Scalars['Boolean']['output'];
};

export type FileMaxAggregate = {
  __typename?: 'FileMaxAggregate';
  blobName?: Maybe<Scalars['String']['output']>;
  container?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type FileMetadata = {
  __typename?: 'FileMetadata';
  blobType?: Maybe<Scalars['String']['output']>;
  cacheControl?: Maybe<Scalars['String']['output']>;
  contentDisposition?: Maybe<Scalars['String']['output']>;
  contentEncoding?: Maybe<Scalars['String']['output']>;
  contentLanguage?: Maybe<Scalars['String']['output']>;
  contentMD5?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<Scalars['String']['output']>;
  createdOn?: Maybe<Scalars['DateTime']['output']>;
  lastAccessed?: Maybe<Scalars['DateTime']['output']>;
  lastModified?: Maybe<Scalars['DateTime']['output']>;
};

export type FileMinAggregate = {
  __typename?: 'FileMinAggregate';
  blobName?: Maybe<Scalars['String']['output']>;
  container?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uuid?: Maybe<Scalars['String']['output']>;
};

export type FileNullableRelationFilter = {
  is?: InputMaybe<FileWhereInput>;
  isNot?: InputMaybe<FileWhereInput>;
};

export type FileOrderByWithRelationInput = {
  applicationProfileFiles?: InputMaybe<ApplicationProfileFileOrderByRelationAggregateInput>;
  assignmentApplications?: InputMaybe<AssignmentApplicationFileOrderByRelationAggregateInput>;
  blobName?: InputMaybe<SortOrder>;
  container?: InputMaybe<SortOrder>;
  coverImageCompanies?: InputMaybe<CompanyOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  logoImageCompanies?: InputMaybe<CompanyOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  owner?: InputMaybe<UserOrderByWithRelationInput>;
  ownerId?: InputMaybe<SortOrderInput>;
  reference?: InputMaybe<CompanyReferenceOrderByWithRelationInput>;
  size?: InputMaybe<SortOrderInput>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  uuid?: InputMaybe<SortOrder>;
};

export type FileRelationFilter = {
  is?: InputMaybe<FileWhereInput>;
  isNot?: InputMaybe<FileWhereInput>;
};

export type FileSumAggregate = {
  __typename?: 'FileSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  ownerId?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
};

export type FileUpdateOneRequiredWithoutApplicationProfileFilesNestedInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutApplicationProfileFilesInput>;
  create?: InputMaybe<FileCreateWithoutApplicationProfileFilesInput>;
  update?: InputMaybe<FileUpdateToOneWithWhereWithoutApplicationProfileFilesInput>;
  upsert?: InputMaybe<FileUpsertWithoutApplicationProfileFilesInput>;
};

export type FileUpdateOneRequiredWithoutAssignmentApplicationsNestedInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutAssignmentApplicationsInput>;
  create?: InputMaybe<FileCreateWithoutAssignmentApplicationsInput>;
  update?: InputMaybe<FileUpdateToOneWithWhereWithoutAssignmentApplicationsInput>;
  upsert?: InputMaybe<FileUpsertWithoutAssignmentApplicationsInput>;
};

export type FileUpdateOneWithoutCoverImageCompaniesNestedInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutCoverImageCompaniesInput>;
  create?: InputMaybe<FileCreateWithoutCoverImageCompaniesInput>;
  delete?: InputMaybe<FileWhereInput>;
  disconnect?: InputMaybe<FileWhereInput>;
  update?: InputMaybe<FileUpdateToOneWithWhereWithoutCoverImageCompaniesInput>;
  upsert?: InputMaybe<FileUpsertWithoutCoverImageCompaniesInput>;
};

export type FileUpdateOneWithoutLogoImageCompaniesNestedInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutLogoImageCompaniesInput>;
  create?: InputMaybe<FileCreateWithoutLogoImageCompaniesInput>;
  delete?: InputMaybe<FileWhereInput>;
  disconnect?: InputMaybe<FileWhereInput>;
  update?: InputMaybe<FileUpdateToOneWithWhereWithoutLogoImageCompaniesInput>;
  upsert?: InputMaybe<FileUpsertWithoutLogoImageCompaniesInput>;
};

export type FileUpdateOneWithoutReferenceNestedInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutReferenceInput>;
  create?: InputMaybe<FileCreateWithoutReferenceInput>;
  delete?: InputMaybe<FileWhereInput>;
  disconnect?: InputMaybe<FileWhereInput>;
  update?: InputMaybe<FileUpdateToOneWithWhereWithoutReferenceInput>;
  upsert?: InputMaybe<FileUpsertWithoutReferenceInput>;
};

export type FileUpdateToOneWithWhereWithoutApplicationProfileFilesInput = {
  data: FileUpdateWithoutApplicationProfileFilesInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpdateToOneWithWhereWithoutAssignmentApplicationsInput = {
  data: FileUpdateWithoutAssignmentApplicationsInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpdateToOneWithWhereWithoutCoverImageCompaniesInput = {
  data: FileUpdateWithoutCoverImageCompaniesInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpdateToOneWithWhereWithoutLogoImageCompaniesInput = {
  data: FileUpdateWithoutLogoImageCompaniesInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpdateToOneWithWhereWithoutReferenceInput = {
  data: FileUpdateWithoutReferenceInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpdateWithoutApplicationProfileFilesInput = {
  blobName?: InputMaybe<Scalars['String']['input']>;
  container?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type FileUpdateWithoutAssignmentApplicationsInput = {
  blobName?: InputMaybe<Scalars['String']['input']>;
  container?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type FileUpdateWithoutCoverImageCompaniesInput = {
  blobName?: InputMaybe<Scalars['String']['input']>;
  container?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type FileUpdateWithoutLogoImageCompaniesInput = {
  blobName?: InputMaybe<Scalars['String']['input']>;
  container?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type FileUpdateWithoutReferenceInput = {
  blobName?: InputMaybe<Scalars['String']['input']>;
  container?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type FileUpsertWithoutApplicationProfileFilesInput = {
  create: FileCreateWithoutApplicationProfileFilesInput;
  update: FileUpdateWithoutApplicationProfileFilesInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpsertWithoutAssignmentApplicationsInput = {
  create: FileCreateWithoutAssignmentApplicationsInput;
  update: FileUpdateWithoutAssignmentApplicationsInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpsertWithoutCoverImageCompaniesInput = {
  create: FileCreateWithoutCoverImageCompaniesInput;
  update: FileUpdateWithoutCoverImageCompaniesInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpsertWithoutLogoImageCompaniesInput = {
  create: FileCreateWithoutLogoImageCompaniesInput;
  update: FileUpdateWithoutLogoImageCompaniesInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpsertWithoutReferenceInput = {
  create: FileCreateWithoutReferenceInput;
  update: FileUpdateWithoutReferenceInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileWhereInput = {
  AND?: InputMaybe<Array<FileWhereInput>>;
  NOT?: InputMaybe<Array<FileWhereInput>>;
  OR?: InputMaybe<Array<FileWhereInput>>;
  applicationProfileFiles?: InputMaybe<ApplicationProfileFileListRelationFilter>;
  assignmentApplications?: InputMaybe<AssignmentApplicationFileListRelationFilter>;
  blobName?: InputMaybe<StringFilter>;
  container?: InputMaybe<StringFilter>;
  coverImageCompanies?: InputMaybe<CompanyListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  logoImageCompanies?: InputMaybe<CompanyListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  owner?: InputMaybe<UserNullableRelationFilter>;
  ownerId?: InputMaybe<IntNullableFilter>;
  reference?: InputMaybe<CompanyReferenceNullableRelationFilter>;
  size?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserNullableRelationFilter>;
  uuid?: InputMaybe<StringFilter>;
};

export type FileWhereUniqueInput = {
  AND?: InputMaybe<Array<FileWhereInput>>;
  NOT?: InputMaybe<Array<FileWhereInput>>;
  OR?: InputMaybe<Array<FileWhereInput>>;
  applicationProfileFiles?: InputMaybe<ApplicationProfileFileListRelationFilter>;
  assignmentApplications?: InputMaybe<AssignmentApplicationFileListRelationFilter>;
  blobName?: InputMaybe<Scalars['String']['input']>;
  container?: InputMaybe<StringFilter>;
  coverImageCompanies?: InputMaybe<CompanyListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  logoImageCompanies?: InputMaybe<CompanyListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  owner?: InputMaybe<UserNullableRelationFilter>;
  ownerId?: InputMaybe<IntNullableFilter>;
  reference?: InputMaybe<CompanyReferenceNullableRelationFilter>;
  size?: InputMaybe<IntNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserNullableRelationFilter>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum Interval {
  HalfYear = 'HALF_YEAR',
  Month = 'MONTH',
  None = 'NONE',
  Quarter = 'QUARTER',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type InviteOutput = {
  __typename?: 'InviteOutput';
  success: Scalars['String']['output'];
};

export type Invoice = {
  __typename?: 'Invoice';
  date?: Maybe<Scalars['DateTime']['output']>;
  downloadLink?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  priceExVat?: Maybe<Scalars['Float']['output']>;
  priceInclVat?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  subscription?: Maybe<Scalars['String']['output']>;
};

export type LegacyApiUserAvgAggregate = {
  __typename?: 'LegacyApiUserAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type LegacyApiUserCountAggregate = {
  __typename?: 'LegacyApiUserCountAggregate';
  _all: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type LegacyApiUserMaxAggregate = {
  __typename?: 'LegacyApiUserMaxAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type LegacyApiUserMinAggregate = {
  __typename?: 'LegacyApiUserMinAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type LegacyApiUserSumAggregate = {
  __typename?: 'LegacyApiUserSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type LegacyInvoice = {
  __typename?: 'LegacyInvoice';
  _count: LegacyInvoiceCount;
  addressLine1?: Maybe<Scalars['String']['output']>;
  addressLine2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  legacyInvoiceItems?: Maybe<Array<LegacyInvoiceItem>>;
  postalCode?: Maybe<Scalars['String']['output']>;
  status: LegacyInvoiceStatus;
};

export type LegacyInvoiceAvgAggregate = {
  __typename?: 'LegacyInvoiceAvgAggregate';
  companyId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type LegacyInvoiceCount = {
  __typename?: 'LegacyInvoiceCount';
  legacyInvoiceItems: Scalars['Int']['output'];
};

export type LegacyInvoiceCountAggregate = {
  __typename?: 'LegacyInvoiceCountAggregate';
  _all: Scalars['Int']['output'];
  addressLine1: Scalars['Int']['output'];
  addressLine2: Scalars['Int']['output'];
  city: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  firstName: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['Int']['output'];
  postalCode: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
};

export type LegacyInvoiceItem = {
  __typename?: 'LegacyInvoiceItem';
  amount: Scalars['Int']['output'];
  contractId?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  invoiceItemCode: LegacyInvoiceItemCode;
  legacyInvoice: LegacyInvoice;
  legacyInvoiceId: Scalars['Int']['output'];
  price: Scalars['Int']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
  taxPercent: Scalars['Int']['output'];
};

export type LegacyInvoiceItemAvgAggregate = {
  __typename?: 'LegacyInvoiceItemAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  contractId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  legacyInvoiceId?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  taxPercent?: Maybe<Scalars['Float']['output']>;
};

export enum LegacyInvoiceItemCode {
  Contract = 'CONTRACT',
  Credit = 'CREDIT',
  Discount = 'DISCOUNT'
}

export type LegacyInvoiceItemCountAggregate = {
  __typename?: 'LegacyInvoiceItemCountAggregate';
  _all: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  contractId: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  endDate: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  invoiceItemCode: Scalars['Int']['output'];
  legacyInvoiceId: Scalars['Int']['output'];
  price: Scalars['Int']['output'];
  startDate: Scalars['Int']['output'];
  taxPercent: Scalars['Int']['output'];
};

export type LegacyInvoiceItemMaxAggregate = {
  __typename?: 'LegacyInvoiceItemMaxAggregate';
  amount?: Maybe<Scalars['Int']['output']>;
  contractId?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  invoiceItemCode?: Maybe<LegacyInvoiceItemCode>;
  legacyInvoiceId?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  taxPercent?: Maybe<Scalars['Int']['output']>;
};

export type LegacyInvoiceItemMinAggregate = {
  __typename?: 'LegacyInvoiceItemMinAggregate';
  amount?: Maybe<Scalars['Int']['output']>;
  contractId?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  invoiceItemCode?: Maybe<LegacyInvoiceItemCode>;
  legacyInvoiceId?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  taxPercent?: Maybe<Scalars['Int']['output']>;
};

export type LegacyInvoiceItemSumAggregate = {
  __typename?: 'LegacyInvoiceItemSumAggregate';
  amount?: Maybe<Scalars['Int']['output']>;
  contractId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  legacyInvoiceId?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  taxPercent?: Maybe<Scalars['Int']['output']>;
};

export type LegacyInvoiceMaxAggregate = {
  __typename?: 'LegacyInvoiceMaxAggregate';
  addressLine1?: Maybe<Scalars['String']['output']>;
  addressLine2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  status?: Maybe<LegacyInvoiceStatus>;
};

export type LegacyInvoiceMinAggregate = {
  __typename?: 'LegacyInvoiceMinAggregate';
  addressLine1?: Maybe<Scalars['String']['output']>;
  addressLine2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  status?: Maybe<LegacyInvoiceStatus>;
};

export enum LegacyInvoiceStatus {
  Collection = 'COLLECTION',
  Collectionsent = 'COLLECTIONSENT',
  Credit = 'CREDIT',
  Credited = 'CREDITED',
  CreditFail = 'CREDIT_FAIL',
  CreditPending = 'CREDIT_PENDING',
  Expired = 'EXPIRED',
  InternalPending = 'INTERNAL_PENDING',
  New = 'NEW',
  Open = 'OPEN',
  Paid = 'PAID',
  Pending = 'PENDING',
  Removed = 'REMOVED'
}

export type LegacyInvoiceSumAggregate = {
  __typename?: 'LegacyInvoiceSumAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['ID']['output'];
  profile: Profile;
  profileId: Scalars['Int']['output'];
  type: LinkType;
  url: Scalars['String']['output'];
};

export type LinkAvgAggregate = {
  __typename?: 'LinkAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  profileId?: Maybe<Scalars['Float']['output']>;
};

export type LinkCountAggregate = {
  __typename?: 'LinkCountAggregate';
  _all: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  profileId: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  url: Scalars['Int']['output'];
};

export type LinkCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<LinkWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LinkCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<LinkCreateWithoutProfileInput>;
};

export type LinkCreateOrConnectWithoutProfileInput = {
  create: LinkCreateWithoutProfileInput;
  where: LinkWhereUniqueInput;
};

export type LinkCreateWithoutProfileInput = {
  profileId: Scalars['Int']['input'];
  type: LinkType;
  url: Scalars['String']['input'];
};

export type LinkMaxAggregate = {
  __typename?: 'LinkMaxAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  profileId?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<LinkType>;
  url?: Maybe<Scalars['String']['output']>;
};

export type LinkMinAggregate = {
  __typename?: 'LinkMinAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  profileId?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<LinkType>;
  url?: Maybe<Scalars['String']['output']>;
};

export type LinkNullableRelationFilter = {
  is?: InputMaybe<LinkWhereInput>;
  isNot?: InputMaybe<LinkWhereInput>;
};

export type LinkOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type LinkSumAggregate = {
  __typename?: 'LinkSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  profileId?: Maybe<Scalars['Int']['output']>;
};

export enum LinkType {
  Facebook = 'FACEBOOK',
  Instagram = 'INSTAGRAM',
  Linkedin = 'LINKEDIN',
  Website = 'WEBSITE'
}

export type LinkUpdateOneWithoutProfileNestedInput = {
  connect?: InputMaybe<LinkWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LinkCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<LinkCreateWithoutProfileInput>;
  delete?: InputMaybe<LinkWhereInput>;
  disconnect?: InputMaybe<LinkWhereInput>;
  update?: InputMaybe<LinkUpdateToOneWithWhereWithoutProfileInput>;
  upsert?: InputMaybe<LinkUpsertWithoutProfileInput>;
};

export type LinkUpdateToOneWithWhereWithoutProfileInput = {
  data: LinkUpdateWithoutProfileInput;
  where?: InputMaybe<LinkWhereInput>;
};

export type LinkUpdateWithoutProfileInput = {
  profileId?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<LinkType>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type LinkUpsertWithoutProfileInput = {
  create: LinkCreateWithoutProfileInput;
  update: LinkUpdateWithoutProfileInput;
  where?: InputMaybe<LinkWhereInput>;
};

export type LinkWhereInput = {
  AND?: InputMaybe<Array<LinkWhereInput>>;
  NOT?: InputMaybe<Array<LinkWhereInput>>;
  OR?: InputMaybe<Array<LinkWhereInput>>;
  id?: InputMaybe<IntFilter>;
  profile?: InputMaybe<ProfileRelationFilter>;
  profileId?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumLinkTypeFilter>;
  url?: InputMaybe<StringFilter>;
};

export type LinkWhereUniqueInput = {
  AND?: InputMaybe<Array<LinkWhereInput>>;
  NOT?: InputMaybe<Array<LinkWhereInput>>;
  OR?: InputMaybe<Array<LinkWhereInput>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  profile?: InputMaybe<ProfileRelationFilter>;
  profileId?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumLinkTypeFilter>;
  url?: InputMaybe<StringFilter>;
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  idToken: Scalars['String']['output'];
  permissionsByCompany: Array<PermissionsByCompanyId>;
  refreshToken: Scalars['String']['output'];
};

export type Match = {
  __typename?: 'Match';
  _count: MatchCount;
  assignment: Assignment;
  assignmentId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  matchNotifications?: Maybe<Array<MatchNotification>>;
  savedSearch: SavedSearch;
  savedSearchId: Scalars['Int']['output'];
};

export type MatchAvgAggregate = {
  __typename?: 'MatchAvgAggregate';
  assignmentId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  savedSearchId?: Maybe<Scalars['Float']['output']>;
};

export type MatchBatchAvgAggregate = {
  __typename?: 'MatchBatchAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type MatchBatchCount = {
  __typename?: 'MatchBatchCount';
  assignments: Scalars['Int']['output'];
};

export type MatchBatchCountAggregate = {
  __typename?: 'MatchBatchCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  failed: Scalars['Int']['output'];
  finishedAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
};

export type MatchBatchMaxAggregate = {
  __typename?: 'MatchBatchMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  failed?: Maybe<Scalars['Boolean']['output']>;
  finishedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type MatchBatchMinAggregate = {
  __typename?: 'MatchBatchMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  failed?: Maybe<Scalars['Boolean']['output']>;
  finishedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type MatchBatchSumAggregate = {
  __typename?: 'MatchBatchSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type MatchCount = {
  __typename?: 'MatchCount';
  matchNotifications: Scalars['Int']['output'];
};

export type MatchCountAggregate = {
  __typename?: 'MatchCountAggregate';
  _all: Scalars['Int']['output'];
  assignmentId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  savedSearchId: Scalars['Int']['output'];
};

export type MatchMaxAggregate = {
  __typename?: 'MatchMaxAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  savedSearchId?: Maybe<Scalars['Int']['output']>;
};

export type MatchMinAggregate = {
  __typename?: 'MatchMinAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  savedSearchId?: Maybe<Scalars['Int']['output']>;
};

export type MatchNotification = {
  __typename?: 'MatchNotification';
  assignmentId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  handledAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  match: Match;
  matchId: Scalars['Int']['output'];
  type: MatchNotificationType;
  userId: Scalars['Int']['output'];
};

export type MatchNotificationAvgAggregate = {
  __typename?: 'MatchNotificationAvgAggregate';
  assignmentId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  matchId?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type MatchNotificationCountAggregate = {
  __typename?: 'MatchNotificationCountAggregate';
  _all: Scalars['Int']['output'];
  assignmentId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  handledAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  matchId: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type MatchNotificationMaxAggregate = {
  __typename?: 'MatchNotificationMaxAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  handledAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  matchId?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<MatchNotificationType>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type MatchNotificationMinAggregate = {
  __typename?: 'MatchNotificationMinAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  handledAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  matchId?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<MatchNotificationType>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type MatchNotificationSumAggregate = {
  __typename?: 'MatchNotificationSumAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  matchId?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export enum MatchNotificationType {
  Batch = 'BATCH',
  Instant = 'INSTANT'
}

export type MatchSumAggregate = {
  __typename?: 'MatchSumAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  savedSearchId?: Maybe<Scalars['Int']['output']>;
};

export enum ModeType {
  Payment = 'PAYMENT',
  Setup = 'SETUP',
  Subscription = 'SUBSCRIPTION'
}

export type Mutation = {
  __typename?: 'Mutation';
  addFavorite: UserFavorite;
  cancelSubscription: StripeSubscription;
  checkoutCreate: Checkout;
  checkoutInvoiceCreate: CheckoutInvoice;
  closeAssignment: Status;
  companyCreate: Company;
  companyTypeUpdate: Scalars['String']['output'];
  companyUpdate: Company;
  conceptAssignment: Status;
  confirm: ConfirmOutput;
  confirmInvite: ConfirmInviteOutput;
  createApiUserKey: ApiUserCompany;
  createApplicationProfile: ApplicationProfile;
  createAssignment: Assignment;
  createAssignmentApplication: AssignmentApplication;
  createAssignmentApplicationRead: AssignmentApplicationRead;
  createAssignmentRead: AssignmentRead;
  createCompanyReference: CompanyReference;
  createContract: CreateContractOutput;
  createDraftAssignment: Assignment;
  createDraftAssignmentApplication: AssignmentApplication;
  createFile: File;
  createFileForApplicationProfile: File;
  createFileForAssignmentApplication: File;
  createLegacyApiAccount: ApiCompany;
  createOrUpdateCompanyReference: CompanyReference;
  createQuestionAssignmentApplication: AssignmentApplication;
  createReview: Review;
  createSavedSearch: SavedSearch;
  deleteAllAssignments: Scalars['String']['output'];
  deleteApplicationProfile: Scalars['Boolean']['output'];
  deleteAssignment: Scalars['String']['output'];
  deleteAssignmentApplication: Scalars['Boolean']['output'];
  deleteAssignmentIndex: Scalars['String']['output'];
  deleteCompanyImage: Scalars['Boolean']['output'];
  deleteCompanyReference: CompanyReference;
  deleteReview: Scalars['Boolean']['output'];
  deleteSavedSearch: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  enableSubscription: StripeSubscription;
  endProContract: EndProContractOutput;
  fileDelete: Scalars['Boolean']['output'];
  hubSpotEvent: Scalars['Boolean']['output'];
  invite: InviteOutput;
  inviteAdmin: InviteOutput;
  login: LoginOutput;
  markNotificationsAsRead: Scalars['Int']['output'];
  pauseAssignment: Status;
  reassignAssignment: Assignment;
  refreshSession: LoginOutput;
  register: RegisterOutput;
  reindex: Scalars['String']['output'];
  removeFavorite: UserFavorite;
  requestAssignmentReview: Status;
  requestEmailChangeAdmin: RequestInvitationOutput;
  requestInvitation: RequestInvitationOutput;
  resetMyUnreadNotificationCount: Scalars['String']['output'];
  resetPassword: PasswordResetOutput;
  resumeAssignment: Status;
  reviewApproved: Status;
  reviewAssignment: Status;
  reviewDeclined: Status;
  sendPasswordResetEmail: PasswordForgetOutput;
  settingUpsert: Setting;
  settingUpsertAdmin: Setting;
  syncAssignment: Scalars['String']['output'];
  updateApplicationProfile: ApplicationProfile;
  updateAssignmentAdmin: Assignment;
  updateAssignmentApplicationsStatus: Array<Status>;
  updateCompanyImage: Company;
  updateContract: UpdateContractOutput;
  updatePassword: PasswordUpdateOutput;
  updateSavedSearch: SavedSearch;
  userCompanyDelete: Scalars['Boolean']['output'];
  userCompanyUpdate: Scalars['Boolean']['output'];
  userUpdate: User;
  verifyEmailChange: LoginOutput;
};


export type MutationAddFavoriteArgs = {
  assignmentId: Scalars['Int']['input'];
};


export type MutationCancelSubscriptionArgs = {
  contractId: Scalars['Float']['input'];
};


export type MutationCheckoutCreateArgs = {
  data: CheckoutCreateInput;
};


export type MutationCheckoutInvoiceCreateArgs = {
  checkoutInvoiceCreateInput: CheckoutInvoiceCreateInput;
};


export type MutationCloseAssignmentArgs = {
  assignmentId: Scalars['Int']['input'];
};


export type MutationCompanyCreateArgs = {
  data: CompanyCreateInput;
};


export type MutationCompanyTypeUpdateArgs = {
  companyId: Scalars['Float']['input'];
  type: CompanyType;
};


export type MutationCompanyUpdateArgs = {
  data: CompanyUpdateInput;
  where: CompanyWhereUniqueInput;
};


export type MutationConceptAssignmentArgs = {
  assignmentId: Scalars['Int']['input'];
};


export type MutationConfirmArgs = {
  token: Scalars['String']['input'];
};


export type MutationConfirmInviteArgs = {
  companyId?: InputMaybe<Scalars['Float']['input']>;
  firstName: Scalars['String']['input'];
  inviteToken: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  privacySettings: PrivacySettings;
};


export type MutationCreateApiUserKeyArgs = {
  apiCompanyId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
  userKey: Scalars['String']['input'];
  usersCompaniesId: Scalars['Int']['input'];
};


export type MutationCreateApplicationProfileArgs = {
  data: ApplicationProfileCreateInput;
};


export type MutationCreateAssignmentArgs = {
  assignmentId?: InputMaybe<Scalars['Int']['input']>;
  data: AssignmentUpdateInput;
};


export type MutationCreateAssignmentApplicationArgs = {
  assignmentApplicationId?: InputMaybe<Scalars['Int']['input']>;
  assignmentId: Scalars['Int']['input'];
  data: AssignmentApplicationUpdateInput;
};


export type MutationCreateAssignmentApplicationReadArgs = {
  assignmentApplicationId: Scalars['Float']['input'];
};


export type MutationCreateAssignmentReadArgs = {
  assignmentId: Scalars['Float']['input'];
};


export type MutationCreateCompanyReferenceArgs = {
  data: CompanyReferenceCreateInput;
  fileInput?: InputMaybe<FileInputData>;
};


export type MutationCreateContractArgs = {
  input: CustomContractCreateInput;
};


export type MutationCreateDraftAssignmentArgs = {
  assignmentId?: InputMaybe<Scalars['Int']['input']>;
  data: AssignmentUpdateInput;
};


export type MutationCreateDraftAssignmentApplicationArgs = {
  assignmentApplicationId?: InputMaybe<Scalars['Int']['input']>;
  assignmentId: Scalars['Int']['input'];
  data: AssignmentApplicationUpdateInput;
};


export type MutationCreateFileArgs = {
  data: FileCreateInput;
};


export type MutationCreateFileForApplicationProfileArgs = {
  applicationProfileUUID: Scalars['String']['input'];
  data: FileInputData;
};


export type MutationCreateFileForAssignmentApplicationArgs = {
  assignmentApplicationUUID: Scalars['String']['input'];
  data: FileInputData;
};


export type MutationCreateLegacyApiAccountArgs = {
  apiEmailRegex?: InputMaybe<Scalars['String']['input']>;
  companyId: Scalars['Int']['input'];
  defaultOwnerId: Scalars['Int']['input'];
};


export type MutationCreateOrUpdateCompanyReferenceArgs = {
  companyReferenceId?: InputMaybe<Scalars['Float']['input']>;
  data: CompanyReferenceUpdateInput;
  fileInput?: InputMaybe<FileInputData>;
};


export type MutationCreateQuestionAssignmentApplicationArgs = {
  assignmentId: Scalars['Int']['input'];
  questionText: Scalars['String']['input'];
};


export type MutationCreateReviewArgs = {
  data: ReviewCreateInput;
};


export type MutationCreateSavedSearchArgs = {
  data: SavedSearchCreateInput;
};


export type MutationDeleteApplicationProfileArgs = {
  applicationProfileId: Scalars['Int']['input'];
};


export type MutationDeleteAssignmentArgs = {
  assignmentId: Scalars['Int']['input'];
};


export type MutationDeleteAssignmentApplicationArgs = {
  assignmentApplicationId: Scalars['Int']['input'];
};


export type MutationDeleteAssignmentIndexArgs = {
  assignmentId: Scalars['Int']['input'];
};


export type MutationDeleteCompanyImageArgs = {
  imageType: CompanyImageType;
};


export type MutationDeleteCompanyReferenceArgs = {
  companyReferenceId: Scalars['Float']['input'];
};


export type MutationDeleteReviewArgs = {
  reviewId: Scalars['Int']['input'];
};


export type MutationDeleteSavedSearchArgs = {
  where: SavedSearchFindUniqueInput;
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationEnableSubscriptionArgs = {
  contractId: Scalars['Float']['input'];
};


export type MutationEndProContractArgs = {
  basicCompanyStartDate: Scalars['String']['input'];
  companyId: Scalars['Float']['input'];
  proEndDate: Scalars['String']['input'];
};


export type MutationFileDeleteArgs = {
  blobName: Scalars['String']['input'];
  containerName: Scalars['String']['input'];
};


export type MutationHubSpotEventArgs = {
  eventName: Scalars['String']['input'];
  utk: Scalars['String']['input'];
};


export type MutationInviteArgs = {
  companyId?: InputMaybe<Scalars['Float']['input']>;
  email: Scalars['String']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  userCompanyRole: Scalars['String']['input'];
};


export type MutationInviteAdminArgs = {
  companyId?: InputMaybe<Scalars['Float']['input']>;
  email: Scalars['String']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  userCompanyRole: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationMarkNotificationsAsReadArgs = {
  where: NotificationWhereInput;
};


export type MutationPauseAssignmentArgs = {
  assignmentId: Scalars['Int']['input'];
};


export type MutationReassignAssignmentArgs = {
  assignmentId: Scalars['Int']['input'];
  ownerId: Scalars['Int']['input'];
};


export type MutationRefreshSessionArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  privacySettings: PrivacySettings;
  role: Scalars['String']['input'];
};


export type MutationRemoveFavoriteArgs = {
  assignmentId: Scalars['Int']['input'];
};


export type MutationRequestAssignmentReviewArgs = {
  assignmentId: Scalars['Int']['input'];
};


export type MutationRequestEmailChangeAdminArgs = {
  email: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationRequestInvitationArgs = {
  cocNumber: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationResumeAssignmentArgs = {
  assignmentId: Scalars['Int']['input'];
};


export type MutationReviewApprovedArgs = {
  assignmentId: Scalars['Int']['input'];
};


export type MutationReviewAssignmentArgs = {
  assignmentId: Scalars['Int']['input'];
};


export type MutationReviewDeclinedArgs = {
  data: DeclineAssignment;
};


export type MutationSendPasswordResetEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationSettingUpsertArgs = {
  key: Scalars['String']['input'];
  settingId?: InputMaybe<Scalars['Int']['input']>;
  type: SettingType;
  value: Scalars['String']['input'];
};


export type MutationSettingUpsertAdminArgs = {
  key: Scalars['String']['input'];
  settingId?: InputMaybe<Scalars['Int']['input']>;
  type: SettingType;
  userId: Scalars['Int']['input'];
  value: Scalars['String']['input'];
};


export type MutationSyncAssignmentArgs = {
  assignmentId: Scalars['Int']['input'];
};


export type MutationUpdateApplicationProfileArgs = {
  data: ApplicationProfileUpdateInput;
  where: ApplicationProfileWhereUniqueInput;
};


export type MutationUpdateAssignmentAdminArgs = {
  assignmentId?: InputMaybe<Scalars['Int']['input']>;
  data: AssignmentUpdateInput;
};


export type MutationUpdateAssignmentApplicationsStatusArgs = {
  assignmentApplicationIds: Array<Scalars['Int']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  status: AssignmentApplicationStatus;
};


export type MutationUpdateCompanyImageArgs = {
  data: FileInputData;
  imageType: CompanyImageType;
};


export type MutationUpdateContractArgs = {
  companyId: Scalars['Float']['input'];
  contractId: Scalars['Float']['input'];
  input: ContractUpdateInput;
};


export type MutationUpdatePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateSavedSearchArgs = {
  data: SavedSearchUpdateInput;
  where: SavedSearchFindUniqueInput;
};


export type MutationUserCompanyDeleteArgs = {
  currentOwner?: InputMaybe<Scalars['Float']['input']>;
  newOwner?: InputMaybe<Scalars['Float']['input']>;
  where: UsersCompaniesWhereUniqueInput;
};


export type MutationUserCompanyUpdateArgs = {
  data: UpdateUsersCompaniesInput;
  where: UsersCompaniesWhereUniqueInput;
};


export type MutationUserUpdateArgs = {
  data: UserUpdateInput;
  id: Scalars['Int']['input'];
};


export type MutationVerifyEmailChangeArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedBoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedEnumAssignmentApplicationStatusFilter = {
  equals?: InputMaybe<AssignmentApplicationStatus>;
  in?: InputMaybe<Array<AssignmentApplicationStatus>>;
  not?: InputMaybe<NestedEnumAssignmentApplicationStatusFilter>;
  notIn?: InputMaybe<Array<AssignmentApplicationStatus>>;
};

export type NestedEnumAssignmentSourceFilter = {
  equals?: InputMaybe<AssignmentSource>;
  in?: InputMaybe<Array<AssignmentSource>>;
  not?: InputMaybe<NestedEnumAssignmentSourceFilter>;
  notIn?: InputMaybe<Array<AssignmentSource>>;
};

export type NestedEnumAssignmentStatusNullableFilter = {
  equals?: InputMaybe<AssignmentStatus>;
  in?: InputMaybe<Array<AssignmentStatus>>;
  not?: InputMaybe<NestedEnumAssignmentStatusNullableFilter>;
  notIn?: InputMaybe<Array<AssignmentStatus>>;
};

export type NestedEnumAssignmentTypeNullableFilter = {
  equals?: InputMaybe<AssignmentType>;
  in?: InputMaybe<Array<AssignmentType>>;
  not?: InputMaybe<NestedEnumAssignmentTypeNullableFilter>;
  notIn?: InputMaybe<Array<AssignmentType>>;
};

export type NestedEnumAvailabilityNullableFilter = {
  equals?: InputMaybe<Availability>;
  in?: InputMaybe<Array<Availability>>;
  not?: InputMaybe<NestedEnumAvailabilityNullableFilter>;
  notIn?: InputMaybe<Array<Availability>>;
};

export type NestedEnumCompanyTypeFilter = {
  equals?: InputMaybe<CompanyType>;
  in?: InputMaybe<Array<CompanyType>>;
  not?: InputMaybe<NestedEnumCompanyTypeFilter>;
  notIn?: InputMaybe<Array<CompanyType>>;
};

export type NestedEnumContractTypeNullableFilter = {
  equals?: InputMaybe<ContractType>;
  in?: InputMaybe<Array<ContractType>>;
  not?: InputMaybe<NestedEnumContractTypeNullableFilter>;
  notIn?: InputMaybe<Array<ContractType>>;
};

export type NestedEnumCustomerRelationNullableFilter = {
  equals?: InputMaybe<CustomerRelation>;
  in?: InputMaybe<Array<CustomerRelation>>;
  not?: InputMaybe<NestedEnumCustomerRelationNullableFilter>;
  notIn?: InputMaybe<Array<CustomerRelation>>;
};

export type NestedEnumDurationTypeNullableFilter = {
  equals?: InputMaybe<DurationType>;
  in?: InputMaybe<Array<DurationType>>;
  not?: InputMaybe<NestedEnumDurationTypeNullableFilter>;
  notIn?: InputMaybe<Array<DurationType>>;
};

export type NestedEnumExpertiseTypeFilter = {
  equals?: InputMaybe<ExpertiseType>;
  in?: InputMaybe<Array<ExpertiseType>>;
  not?: InputMaybe<NestedEnumExpertiseTypeFilter>;
  notIn?: InputMaybe<Array<ExpertiseType>>;
};

export type NestedEnumIntervalNullableFilter = {
  equals?: InputMaybe<Interval>;
  in?: InputMaybe<Array<Interval>>;
  not?: InputMaybe<NestedEnumIntervalNullableFilter>;
  notIn?: InputMaybe<Array<Interval>>;
};

export type NestedEnumLinkTypeFilter = {
  equals?: InputMaybe<LinkType>;
  in?: InputMaybe<Array<LinkType>>;
  not?: InputMaybe<NestedEnumLinkTypeFilter>;
  notIn?: InputMaybe<Array<LinkType>>;
};

export type NestedEnumModeTypeNullableFilter = {
  equals?: InputMaybe<ModeType>;
  in?: InputMaybe<Array<ModeType>>;
  not?: InputMaybe<NestedEnumModeTypeNullableFilter>;
  notIn?: InputMaybe<Array<ModeType>>;
};

export type NestedEnumNotificationTypeFilter = {
  equals?: InputMaybe<NotificationType>;
  in?: InputMaybe<Array<NotificationType>>;
  not?: InputMaybe<NestedEnumNotificationTypeFilter>;
  notIn?: InputMaybe<Array<NotificationType>>;
};

export type NestedEnumOnLocationNullableFilter = {
  equals?: InputMaybe<OnLocation>;
  in?: InputMaybe<Array<OnLocation>>;
  not?: InputMaybe<NestedEnumOnLocationNullableFilter>;
  notIn?: InputMaybe<Array<OnLocation>>;
};

export type NestedEnumProductSlugFilter = {
  equals?: InputMaybe<ProductSlug>;
  in?: InputMaybe<Array<ProductSlug>>;
  not?: InputMaybe<NestedEnumProductSlugFilter>;
  notIn?: InputMaybe<Array<ProductSlug>>;
};

export type NestedEnumRateTypeNullableFilter = {
  equals?: InputMaybe<RateType>;
  in?: InputMaybe<Array<RateType>>;
  not?: InputMaybe<NestedEnumRateTypeNullableFilter>;
  notIn?: InputMaybe<Array<RateType>>;
};

export type NestedEnumRenewalIntervalNullableFilter = {
  equals?: InputMaybe<RenewalInterval>;
  in?: InputMaybe<Array<RenewalInterval>>;
  not?: InputMaybe<NestedEnumRenewalIntervalNullableFilter>;
  notIn?: InputMaybe<Array<RenewalInterval>>;
};

export type NestedEnumReviewTypeFilter = {
  equals?: InputMaybe<ReviewType>;
  in?: InputMaybe<Array<ReviewType>>;
  not?: InputMaybe<NestedEnumReviewTypeFilter>;
  notIn?: InputMaybe<Array<ReviewType>>;
};

export type NestedEnumSavedSearchTypeNullableFilter = {
  equals?: InputMaybe<SavedSearchType>;
  in?: InputMaybe<Array<SavedSearchType>>;
  not?: InputMaybe<NestedEnumSavedSearchTypeNullableFilter>;
  notIn?: InputMaybe<Array<SavedSearchType>>;
};

export type NestedEnumStatusModelTypeFilter = {
  equals?: InputMaybe<StatusModelType>;
  in?: InputMaybe<Array<StatusModelType>>;
  not?: InputMaybe<NestedEnumStatusModelTypeFilter>;
  notIn?: InputMaybe<Array<StatusModelType>>;
};

export type NestedEnumUsageTypeFilter = {
  equals?: InputMaybe<UsageType>;
  in?: InputMaybe<Array<UsageType>>;
  not?: InputMaybe<NestedEnumUsageTypeFilter>;
  notIn?: InputMaybe<Array<UsageType>>;
};

export type NestedEnumUserCompanyRoleFilter = {
  equals?: InputMaybe<UserCompanyRole>;
  in?: InputMaybe<Array<UserCompanyRole>>;
  not?: InputMaybe<NestedEnumUserCompanyRoleFilter>;
  notIn?: InputMaybe<Array<UserCompanyRole>>;
};

export type NestedFloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Notification = {
  __typename?: 'Notification';
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  emailNotification: Scalars['Boolean']['output'];
  hubspotStatusId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  platformNotification: Scalars['Boolean']['output'];
  readAt?: Maybe<Scalars['DateTime']['output']>;
  retryNotificationId?: Maybe<Scalars['Int']['output']>;
  type: NotificationType;
  userId: Scalars['Int']['output'];
};

export type NotificationAvgAggregate = {
  __typename?: 'NotificationAvgAggregate';
  companyId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  retryNotificationId?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type NotificationCountAggregate = {
  __typename?: 'NotificationCountAggregate';
  _all: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  data: Scalars['Int']['output'];
  deletedAt: Scalars['Int']['output'];
  emailNotification: Scalars['Int']['output'];
  hubspotStatusId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  platformNotification: Scalars['Int']['output'];
  readAt: Scalars['Int']['output'];
  retryNotificationId: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type NotificationMaxAggregate = {
  __typename?: 'NotificationMaxAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  emailNotification?: Maybe<Scalars['Boolean']['output']>;
  hubspotStatusId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  platformNotification?: Maybe<Scalars['Boolean']['output']>;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  retryNotificationId?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<NotificationType>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type NotificationMinAggregate = {
  __typename?: 'NotificationMinAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  emailNotification?: Maybe<Scalars['Boolean']['output']>;
  hubspotStatusId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  platformNotification?: Maybe<Scalars['Boolean']['output']>;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  retryNotificationId?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<NotificationType>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type NotificationOrderByWithRelationInput = {
  companyId?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  data?: InputMaybe<SortOrderInput>;
  deletedAt?: InputMaybe<SortOrderInput>;
  emailNotification?: InputMaybe<SortOrder>;
  hubspotStatusId?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  platformNotification?: InputMaybe<SortOrder>;
  readAt?: InputMaybe<SortOrderInput>;
  retryNotificationId?: InputMaybe<SortOrderInput>;
  type?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrder>;
};

export enum NotificationScalarFieldEnum {
  CompanyId = 'companyId',
  CreatedAt = 'createdAt',
  Data = 'data',
  DeletedAt = 'deletedAt',
  EmailNotification = 'emailNotification',
  HubspotStatusId = 'hubspotStatusId',
  Id = 'id',
  PlatformNotification = 'platformNotification',
  ReadAt = 'readAt',
  RetryNotificationId = 'retryNotificationId',
  Type = 'type',
  UserId = 'userId'
}

export type NotificationSumAggregate = {
  __typename?: 'NotificationSumAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  retryNotificationId?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export enum NotificationType {
  AssignmentsReassigned = 'ASSIGNMENTS_REASSIGNED',
  AssignmentApplicationCreated = 'ASSIGNMENT_APPLICATION_CREATED',
  AssignmentApplicationCreatedCopy = 'ASSIGNMENT_APPLICATION_CREATED_COPY',
  AssignmentApplicationStatusChanged = 'ASSIGNMENT_APPLICATION_STATUS_CHANGED',
  AssignmentArchived = 'ASSIGNMENT_ARCHIVED',
  AssignmentAutoClosed = 'ASSIGNMENT_AUTO_CLOSED',
  AssignmentClosed = 'ASSIGNMENT_CLOSED',
  AssignmentDeclined = 'ASSIGNMENT_DECLINED',
  AssignmentPublished = 'ASSIGNMENT_PUBLISHED',
  CompanyUserRemoved = 'COMPANY_USER_REMOVED',
  MatchNotificationBatch = 'MATCH_NOTIFICATION_BATCH',
  MatchNotificationInstant = 'MATCH_NOTIFICATION_INSTANT',
  NewChatMessage = 'NEW_CHAT_MESSAGE',
  ReviewCreated = 'REVIEW_CREATED',
  UserEmailChangeRequested = 'USER_EMAIL_CHANGE_REQUESTED',
  UserEmailChangeRequestedNotification = 'USER_EMAIL_CHANGE_REQUESTED_NOTIFICATION',
  UserEmailConfirmationRequested = 'USER_EMAIL_CONFIRMATION_REQUESTED',
  UserInviteCreated = 'USER_INVITE_CREATED',
  UserPasswordChanged = 'USER_PASSWORD_CHANGED',
  UserPasswordResetRequested = 'USER_PASSWORD_RESET_REQUESTED',
  UserRoleChanged = 'USER_ROLE_CHANGED'
}

export type NotificationWhereInput = {
  AND?: InputMaybe<Array<NotificationWhereInput>>;
  NOT?: InputMaybe<Array<NotificationWhereInput>>;
  OR?: InputMaybe<Array<NotificationWhereInput>>;
  companyId?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  data?: InputMaybe<StringNullableFilter>;
  deletedAt?: InputMaybe<DateTimeNullableFilter>;
  emailNotification?: InputMaybe<BoolFilter>;
  hubspotStatusId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  platformNotification?: InputMaybe<BoolFilter>;
  readAt?: InputMaybe<DateTimeNullableFilter>;
  retryNotificationId?: InputMaybe<IntNullableFilter>;
  type?: InputMaybe<EnumNotificationTypeFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type NotificationWhereUniqueInput = {
  AND?: InputMaybe<Array<NotificationWhereInput>>;
  NOT?: InputMaybe<Array<NotificationWhereInput>>;
  OR?: InputMaybe<Array<NotificationWhereInput>>;
  companyId?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  data?: InputMaybe<StringNullableFilter>;
  deletedAt?: InputMaybe<DateTimeNullableFilter>;
  emailNotification?: InputMaybe<BoolFilter>;
  hubspotStatusId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  platformNotification?: InputMaybe<BoolFilter>;
  readAt?: InputMaybe<DateTimeNullableFilter>;
  retryNotificationId?: InputMaybe<IntNullableFilter>;
  type?: InputMaybe<EnumNotificationTypeFilter>;
  userId?: InputMaybe<IntFilter>;
};

export enum NullsOrder {
  First = 'first',
  Last = 'last'
}

export enum OnLocation {
  Negotiable = 'NEGOTIABLE',
  No = 'NO',
  Unknown = 'UNKNOWN',
  Yes = 'YES'
}

export type PasswordForgetOutput = {
  __typename?: 'PasswordForgetOutput';
  success: Scalars['String']['output'];
};

export type PasswordResetOutput = {
  __typename?: 'PasswordResetOutput';
  token: Scalars['String']['output'];
};

export type PasswordUpdateOutput = {
  __typename?: 'PasswordUpdateOutput';
  success: Scalars['String']['output'];
};

export type PermissionsByCompanyId = {
  __typename?: 'PermissionsByCompanyId';
  companyId: Scalars['Float']['output'];
  permissions: Array<Scalars['String']['output']>;
};

export type Plan = {
  __typename?: 'Plan';
  _count: PlanCount;
  checkouts?: Maybe<Array<Checkout>>;
  contracts?: Maybe<Array<Contract>>;
  externalProviderId?: Maybe<Scalars['String']['output']>;
  externalProviderPaymentMethodId?: Maybe<Scalars['String']['output']>;
  externalProviderSync: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  price?: Maybe<StripePrice>;
  product: Product;
  productId: Scalars['Int']['output'];
  renewalInterval?: Maybe<RenewalInterval>;
  slug?: Maybe<Scalars['String']['output']>;
  usageAmount?: Maybe<Scalars['Int']['output']>;
  usageInterval?: Maybe<Interval>;
  usageIntervalCount?: Maybe<Scalars['Int']['output']>;
  usageType: UsageType;
};

export type PlanAvgAggregate = {
  __typename?: 'PlanAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  productId?: Maybe<Scalars['Float']['output']>;
  usageAmount?: Maybe<Scalars['Float']['output']>;
  usageIntervalCount?: Maybe<Scalars['Float']['output']>;
};

export type PlanCount = {
  __typename?: 'PlanCount';
  checkouts: Scalars['Int']['output'];
  contracts: Scalars['Int']['output'];
};

export type PlanCountAggregate = {
  __typename?: 'PlanCountAggregate';
  _all: Scalars['Int']['output'];
  externalProviderId: Scalars['Int']['output'];
  externalProviderPaymentMethodId: Scalars['Int']['output'];
  externalProviderSync: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  productId: Scalars['Int']['output'];
  renewalInterval: Scalars['Int']['output'];
  slug: Scalars['Int']['output'];
  usageAmount: Scalars['Int']['output'];
  usageInterval: Scalars['Int']['output'];
  usageIntervalCount: Scalars['Int']['output'];
  usageType: Scalars['Int']['output'];
};

export type PlanCreateOrConnectWithoutContractsInput = {
  create: PlanCreateWithoutContractsInput;
  where: PlanWhereUniqueInput;
};

export type PlanCreateWithoutContractsInput = {
  checkouts?: InputMaybe<CheckoutCreateNestedManyWithoutPlanInput>;
  externalProviderId?: InputMaybe<Scalars['String']['input']>;
  externalProviderPaymentMethodId?: InputMaybe<Scalars['String']['input']>;
  externalProviderSync: Scalars['Boolean']['input'];
  product: ProductCreateNestedOneWithoutPlansInput;
  renewalInterval?: InputMaybe<RenewalInterval>;
  slug?: InputMaybe<Scalars['String']['input']>;
  usageAmount?: InputMaybe<Scalars['Int']['input']>;
  usageInterval?: InputMaybe<Interval>;
  usageIntervalCount?: InputMaybe<Scalars['Int']['input']>;
  usageType: UsageType;
};

export type PlanListRelationFilter = {
  every?: InputMaybe<PlanWhereInput>;
  none?: InputMaybe<PlanWhereInput>;
  some?: InputMaybe<PlanWhereInput>;
};

export type PlanMaxAggregate = {
  __typename?: 'PlanMaxAggregate';
  externalProviderId?: Maybe<Scalars['String']['output']>;
  externalProviderPaymentMethodId?: Maybe<Scalars['String']['output']>;
  externalProviderSync?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  productId?: Maybe<Scalars['Int']['output']>;
  renewalInterval?: Maybe<RenewalInterval>;
  slug?: Maybe<Scalars['String']['output']>;
  usageAmount?: Maybe<Scalars['Int']['output']>;
  usageInterval?: Maybe<Interval>;
  usageIntervalCount?: Maybe<Scalars['Int']['output']>;
  usageType?: Maybe<UsageType>;
};

export type PlanMinAggregate = {
  __typename?: 'PlanMinAggregate';
  externalProviderId?: Maybe<Scalars['String']['output']>;
  externalProviderPaymentMethodId?: Maybe<Scalars['String']['output']>;
  externalProviderSync?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  productId?: Maybe<Scalars['Int']['output']>;
  renewalInterval?: Maybe<RenewalInterval>;
  slug?: Maybe<Scalars['String']['output']>;
  usageAmount?: Maybe<Scalars['Int']['output']>;
  usageInterval?: Maybe<Interval>;
  usageIntervalCount?: Maybe<Scalars['Int']['output']>;
  usageType?: Maybe<UsageType>;
};

export type PlanOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PlanOrderByWithRelationInput = {
  checkouts?: InputMaybe<CheckoutOrderByRelationAggregateInput>;
  contracts?: InputMaybe<ContractOrderByRelationAggregateInput>;
  externalProviderId?: InputMaybe<SortOrderInput>;
  externalProviderPaymentMethodId?: InputMaybe<SortOrderInput>;
  externalProviderSync?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  product?: InputMaybe<ProductOrderByWithRelationInput>;
  productId?: InputMaybe<SortOrder>;
  renewalInterval?: InputMaybe<SortOrderInput>;
  slug?: InputMaybe<SortOrderInput>;
  usageAmount?: InputMaybe<SortOrderInput>;
  usageInterval?: InputMaybe<SortOrderInput>;
  usageIntervalCount?: InputMaybe<SortOrderInput>;
  usageType?: InputMaybe<SortOrder>;
};

export type PlanRelationFilter = {
  is?: InputMaybe<PlanWhereInput>;
  isNot?: InputMaybe<PlanWhereInput>;
};

export enum PlanScalarFieldEnum {
  ExternalProviderId = 'externalProviderId',
  ExternalProviderPaymentMethodId = 'externalProviderPaymentMethodId',
  ExternalProviderSync = 'externalProviderSync',
  Id = 'id',
  ProductId = 'productId',
  RenewalInterval = 'renewalInterval',
  Slug = 'slug',
  UsageAmount = 'usageAmount',
  UsageInterval = 'usageInterval',
  UsageIntervalCount = 'usageIntervalCount',
  UsageType = 'usageType'
}

export type PlanSumAggregate = {
  __typename?: 'PlanSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  productId?: Maybe<Scalars['Int']['output']>;
  usageAmount?: Maybe<Scalars['Int']['output']>;
  usageIntervalCount?: Maybe<Scalars['Int']['output']>;
};

export type PlanUpdateOneRequiredWithoutContractsNestedInput = {
  connect?: InputMaybe<PlanWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PlanCreateOrConnectWithoutContractsInput>;
  create?: InputMaybe<PlanCreateWithoutContractsInput>;
  update?: InputMaybe<PlanUpdateToOneWithWhereWithoutContractsInput>;
  upsert?: InputMaybe<PlanUpsertWithoutContractsInput>;
};

export type PlanUpdateToOneWithWhereWithoutContractsInput = {
  data: PlanUpdateWithoutContractsInput;
  where?: InputMaybe<PlanWhereInput>;
};

export type PlanUpdateWithoutContractsInput = {
  checkouts?: InputMaybe<CheckoutUpdateManyWithoutPlanNestedInput>;
  externalProviderId?: InputMaybe<Scalars['String']['input']>;
  externalProviderPaymentMethodId?: InputMaybe<Scalars['String']['input']>;
  externalProviderSync?: InputMaybe<Scalars['Boolean']['input']>;
  product?: InputMaybe<ProductUpdateOneRequiredWithoutPlansNestedInput>;
  renewalInterval?: InputMaybe<RenewalInterval>;
  slug?: InputMaybe<Scalars['String']['input']>;
  usageAmount?: InputMaybe<Scalars['Int']['input']>;
  usageInterval?: InputMaybe<Interval>;
  usageIntervalCount?: InputMaybe<Scalars['Int']['input']>;
  usageType?: InputMaybe<UsageType>;
};

export type PlanUpsertWithoutContractsInput = {
  create: PlanCreateWithoutContractsInput;
  update: PlanUpdateWithoutContractsInput;
  where?: InputMaybe<PlanWhereInput>;
};

export type PlanWhereInput = {
  AND?: InputMaybe<Array<PlanWhereInput>>;
  NOT?: InputMaybe<Array<PlanWhereInput>>;
  OR?: InputMaybe<Array<PlanWhereInput>>;
  checkouts?: InputMaybe<CheckoutListRelationFilter>;
  contracts?: InputMaybe<ContractListRelationFilter>;
  externalProviderId?: InputMaybe<StringNullableFilter>;
  externalProviderPaymentMethodId?: InputMaybe<StringNullableFilter>;
  externalProviderSync?: InputMaybe<BoolFilter>;
  id?: InputMaybe<IntFilter>;
  product?: InputMaybe<ProductRelationFilter>;
  productId?: InputMaybe<IntFilter>;
  renewalInterval?: InputMaybe<EnumRenewalIntervalNullableFilter>;
  slug?: InputMaybe<StringNullableFilter>;
  usageAmount?: InputMaybe<IntNullableFilter>;
  usageInterval?: InputMaybe<EnumIntervalNullableFilter>;
  usageIntervalCount?: InputMaybe<IntNullableFilter>;
  usageType?: InputMaybe<EnumUsageTypeFilter>;
};

export type PlanWhereUniqueInput = {
  AND?: InputMaybe<Array<PlanWhereInput>>;
  NOT?: InputMaybe<Array<PlanWhereInput>>;
  OR?: InputMaybe<Array<PlanWhereInput>>;
  checkouts?: InputMaybe<CheckoutListRelationFilter>;
  contracts?: InputMaybe<ContractListRelationFilter>;
  externalProviderId?: InputMaybe<StringNullableFilter>;
  externalProviderPaymentMethodId?: InputMaybe<StringNullableFilter>;
  externalProviderSync?: InputMaybe<BoolFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product?: InputMaybe<ProductRelationFilter>;
  productId?: InputMaybe<IntFilter>;
  renewalInterval?: InputMaybe<EnumRenewalIntervalNullableFilter>;
  slug?: InputMaybe<StringNullableFilter>;
  usageAmount?: InputMaybe<IntNullableFilter>;
  usageInterval?: InputMaybe<EnumIntervalNullableFilter>;
  usageIntervalCount?: InputMaybe<IntNullableFilter>;
  usageType?: InputMaybe<EnumUsageTypeFilter>;
};

export type PrivacySettings = {
  askForFeedback: Scalars['Boolean']['input'];
  informAboutProductsAndServices: Scalars['Boolean']['input'];
  informEmployersAnonymouslyWhenMatched: Scalars['Boolean']['input'];
  provideEmployersWithCvWhenMatched: Scalars['Boolean']['input'];
  sendContent: Scalars['Boolean']['input'];
  sendNewsletter: Scalars['Boolean']['input'];
  shareWithMotherAndSisterCompanies: Scalars['Boolean']['input'];
};

export type Product = {
  __typename?: 'Product';
  _count: ProductCount;
  description: Scalars['String']['output'];
  externalProviderId?: Maybe<Scalars['String']['output']>;
  externalProviderSync: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  modeType?: Maybe<ModeType>;
  name: Scalars['String']['output'];
  plans?: Maybe<Array<Plan>>;
  slug: ProductSlug;
};

export type ProductAvgAggregate = {
  __typename?: 'ProductAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
};

export type ProductCount = {
  __typename?: 'ProductCount';
  plans: Scalars['Int']['output'];
};

export type ProductCountAggregate = {
  __typename?: 'ProductCountAggregate';
  _all: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  externalProviderId: Scalars['Int']['output'];
  externalProviderSync: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  modeType: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
  slug: Scalars['Int']['output'];
};

export type ProductCreateNestedOneWithoutPlansInput = {
  connect?: InputMaybe<ProductWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProductCreateOrConnectWithoutPlansInput>;
  create?: InputMaybe<ProductCreateWithoutPlansInput>;
};

export type ProductCreateOrConnectWithoutPlansInput = {
  create: ProductCreateWithoutPlansInput;
  where: ProductWhereUniqueInput;
};

export type ProductCreateWithoutPlansInput = {
  description: Scalars['String']['input'];
  externalProviderId?: InputMaybe<Scalars['String']['input']>;
  externalProviderSync: Scalars['Boolean']['input'];
  modeType?: InputMaybe<ModeType>;
  name: Scalars['String']['input'];
  slug: ProductSlug;
};

export type ProductMaxAggregate = {
  __typename?: 'ProductMaxAggregate';
  description?: Maybe<Scalars['String']['output']>;
  externalProviderId?: Maybe<Scalars['String']['output']>;
  externalProviderSync?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  modeType?: Maybe<ModeType>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<ProductSlug>;
};

export type ProductMinAggregate = {
  __typename?: 'ProductMinAggregate';
  description?: Maybe<Scalars['String']['output']>;
  externalProviderId?: Maybe<Scalars['String']['output']>;
  externalProviderSync?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  modeType?: Maybe<ModeType>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<ProductSlug>;
};

export type ProductOrderByWithRelationInput = {
  description?: InputMaybe<SortOrder>;
  externalProviderId?: InputMaybe<SortOrderInput>;
  externalProviderSync?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  modeType?: InputMaybe<SortOrderInput>;
  name?: InputMaybe<SortOrder>;
  plans?: InputMaybe<PlanOrderByRelationAggregateInput>;
  slug?: InputMaybe<SortOrder>;
};

export type ProductRelationFilter = {
  is?: InputMaybe<ProductWhereInput>;
  isNot?: InputMaybe<ProductWhereInput>;
};

export enum ProductSlug {
  CompanyBasic = 'COMPANY_BASIC',
  CompanyPremiumAssignment = 'COMPANY_PREMIUM_ASSIGNMENT',
  CompanyPremiumProfile = 'COMPANY_PREMIUM_PROFILE',
  CompanyTop = 'COMPANY_TOP',
  FreelancerBasic = 'FREELANCER_BASIC',
  FreelancerPro = 'FREELANCER_PRO',
  MarketmonitorBasicApplication = 'MARKETMONITOR_BASIC_APPLICATION',
  MarketmonitorBasicView = 'MARKETMONITOR_BASIC_VIEW',
  MarketmonitorPremiumApplication = 'MARKETMONITOR_PREMIUM_APPLICATION',
  MarketmonitorPremiumView = 'MARKETMONITOR_PREMIUM_VIEW',
  TopBox = 'TOP_BOX'
}

export type ProductSumAggregate = {
  __typename?: 'ProductSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
};

export type ProductUpdateOneRequiredWithoutPlansNestedInput = {
  connect?: InputMaybe<ProductWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProductCreateOrConnectWithoutPlansInput>;
  create?: InputMaybe<ProductCreateWithoutPlansInput>;
  update?: InputMaybe<ProductUpdateToOneWithWhereWithoutPlansInput>;
  upsert?: InputMaybe<ProductUpsertWithoutPlansInput>;
};

export type ProductUpdateToOneWithWhereWithoutPlansInput = {
  data: ProductUpdateWithoutPlansInput;
  where?: InputMaybe<ProductWhereInput>;
};

export type ProductUpdateWithoutPlansInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  externalProviderId?: InputMaybe<Scalars['String']['input']>;
  externalProviderSync?: InputMaybe<Scalars['Boolean']['input']>;
  modeType?: InputMaybe<ModeType>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<ProductSlug>;
};

export type ProductUpsertWithoutPlansInput = {
  create: ProductCreateWithoutPlansInput;
  update: ProductUpdateWithoutPlansInput;
  where?: InputMaybe<ProductWhereInput>;
};

export type ProductWhereInput = {
  AND?: InputMaybe<Array<ProductWhereInput>>;
  NOT?: InputMaybe<Array<ProductWhereInput>>;
  OR?: InputMaybe<Array<ProductWhereInput>>;
  description?: InputMaybe<StringFilter>;
  externalProviderId?: InputMaybe<StringNullableFilter>;
  externalProviderSync?: InputMaybe<BoolFilter>;
  id?: InputMaybe<IntFilter>;
  modeType?: InputMaybe<EnumModeTypeNullableFilter>;
  name?: InputMaybe<StringFilter>;
  plans?: InputMaybe<PlanListRelationFilter>;
  slug?: InputMaybe<EnumProductSlugFilter>;
};

export type ProductWhereUniqueInput = {
  AND?: InputMaybe<Array<ProductWhereInput>>;
  NOT?: InputMaybe<Array<ProductWhereInput>>;
  OR?: InputMaybe<Array<ProductWhereInput>>;
  description?: InputMaybe<StringFilter>;
  externalProviderId?: InputMaybe<StringNullableFilter>;
  externalProviderSync?: InputMaybe<BoolFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  modeType?: InputMaybe<EnumModeTypeNullableFilter>;
  name?: InputMaybe<StringFilter>;
  plans?: InputMaybe<PlanListRelationFilter>;
  slug?: InputMaybe<ProductSlug>;
};

export type Profile = {
  __typename?: 'Profile';
  company: Company;
  companyId: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  links?: Maybe<Link>;
  name: Scalars['String']['output'];
};

export type ProfileAvgAggregate = {
  __typename?: 'ProfileAvgAggregate';
  companyId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

export type ProfileCountAggregate = {
  __typename?: 'ProfileCountAggregate';
  _all: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['Int']['output'];
};

export type ProfileCreateNestedOneWithoutCompanyInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutCompanyInput>;
  create?: InputMaybe<ProfileCreateWithoutCompanyInput>;
};

export type ProfileCreateOrConnectWithoutCompanyInput = {
  create: ProfileCreateWithoutCompanyInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateWithoutCompanyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<LinkCreateNestedOneWithoutProfileInput>;
  name: Scalars['String']['input'];
};

export type ProfileMaxAggregate = {
  __typename?: 'ProfileMaxAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ProfileMinAggregate = {
  __typename?: 'ProfileMinAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ProfileNullableRelationFilter = {
  is?: InputMaybe<ProfileWhereInput>;
  isNot?: InputMaybe<ProfileWhereInput>;
};

export type ProfileOrderByWithRelationInput = {
  company?: InputMaybe<CompanyOrderByWithRelationInput>;
  companyId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  links?: InputMaybe<LinkOrderByWithRelationInput>;
  name?: InputMaybe<SortOrder>;
};

export type ProfileRelationFilter = {
  is?: InputMaybe<ProfileWhereInput>;
  isNot?: InputMaybe<ProfileWhereInput>;
};

export type ProfileSumAggregate = {
  __typename?: 'ProfileSumAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type ProfileUpdateOneWithoutCompanyNestedInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutCompanyInput>;
  create?: InputMaybe<ProfileCreateWithoutCompanyInput>;
  delete?: InputMaybe<ProfileWhereInput>;
  disconnect?: InputMaybe<ProfileWhereInput>;
  update?: InputMaybe<ProfileUpdateToOneWithWhereWithoutCompanyInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutCompanyInput>;
};

export type ProfileUpdateToOneWithWhereWithoutCompanyInput = {
  data: ProfileUpdateWithoutCompanyInput;
  where?: InputMaybe<ProfileWhereInput>;
};

export type ProfileUpdateWithoutCompanyInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<LinkUpdateOneWithoutProfileNestedInput>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ProfileUpsertWithoutCompanyInput = {
  create: ProfileCreateWithoutCompanyInput;
  update: ProfileUpdateWithoutCompanyInput;
  where?: InputMaybe<ProfileWhereInput>;
};

export type ProfileWhereInput = {
  AND?: InputMaybe<Array<ProfileWhereInput>>;
  NOT?: InputMaybe<Array<ProfileWhereInput>>;
  OR?: InputMaybe<Array<ProfileWhereInput>>;
  company?: InputMaybe<CompanyRelationFilter>;
  companyId?: InputMaybe<IntFilter>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  links?: InputMaybe<LinkNullableRelationFilter>;
  name?: InputMaybe<StringFilter>;
};

export type ProfileWhereUniqueInput = {
  AND?: InputMaybe<Array<ProfileWhereInput>>;
  NOT?: InputMaybe<Array<ProfileWhereInput>>;
  OR?: InputMaybe<Array<ProfileWhereInput>>;
  company?: InputMaybe<CompanyRelationFilter>;
  companyId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  links?: InputMaybe<LinkNullableRelationFilter>;
  name?: InputMaybe<StringFilter>;
};

export type PublicCompany = {
  __typename?: 'PublicCompany';
  coverImageFile?: Maybe<File>;
  id: Scalars['ID']['output'];
  logoImageFile?: Maybe<File>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  activeContractSlugs: Array<Scalars['String']['output']>;
  allCompanyAssignmentApplications?: Maybe<Array<AssignmentApplication>>;
  applicationProfile?: Maybe<ApplicationProfile>;
  applicationProfiles?: Maybe<Array<ApplicationProfile>>;
  assignment?: Maybe<Assignment>;
  assignmentAdmin?: Maybe<Assignment>;
  assignmentApplication?: Maybe<AssignmentApplication>;
  assignmentApplicationAdmin?: Maybe<AssignmentApplication>;
  assignmentApplications?: Maybe<Array<AssignmentApplication>>;
  assignmentApplicationsAdmin?: Maybe<Array<AssignmentApplication>>;
  assignments?: Maybe<Array<Assignment>>;
  assignmentsAdmin?: Maybe<Array<Assignment>>;
  assignmentsRemainingUsage: Array<Credit>;
  canReview: Scalars['Boolean']['output'];
  checkEmailChange: RequestEmailChangeOutput;
  checkInvite: CheckTokenOutput;
  checkout: Checkout;
  checkoutInvoice: CheckoutInvoiceDetails;
  companies: Array<Company>;
  companiesPublicData: Array<PublicCompany>;
  company: Company;
  companyCheck?: Maybe<Company>;
  companyReferences: Array<CompanyReference>;
  contracts: Array<Contract>;
  countAllCompanyAssignmentApplications: Scalars['Int']['output'];
  countAssignmentApplications: Scalars['Int']['output'];
  countAssignmentApplicationsAdmin: Scalars['Int']['output'];
  countAssignments: Scalars['Int']['output'];
  countAssignmentsAdmin: Scalars['Int']['output'];
  countCompanies: Scalars['Int']['output'];
  countCurrentCompanyUsers: Scalars['Int']['output'];
  countMyAssignments: Scalars['Int']['output'];
  countMyCompanyAssignments: Scalars['Int']['output'];
  countReviews: Scalars['Int']['output'];
  countSentAssignmentApplications: Scalars['Int']['output'];
  countUsers: Scalars['Int']['output'];
  currentCompanyUsers: Array<User>;
  fileDownloadLink: DownloadLink;
  fileIsOwner: FileIsOwner;
  fileMetaData: FileMetadata;
  fileUploadLink: UploadLink;
  getReindexingStatus: Scalars['String']['output'];
  getUserByEmail: User;
  hasCompanyProfile: Scalars['Boolean']['output'];
  healthAssignmentApi: Scalars['String']['output'];
  healthAuth: Scalars['String']['output'];
  healthContract: Scalars['String']['output'];
  healthCore: Scalars['String']['output'];
  healthSearch: Scalars['String']['output'];
  healthStorage: Scalars['String']['output'];
  healthVerification: Scalars['String']['output'];
  invoices: Array<Invoice>;
  invoicesAdmin: Array<Invoice>;
  me: User;
  metadata: Scalars['String']['output'];
  myApplicationProfile?: Maybe<ApplicationProfile>;
  myApplicationProfiles?: Maybe<Array<ApplicationProfile>>;
  myAssignment?: Maybe<Assignment>;
  myAssignments?: Maybe<Array<Assignment>>;
  myCompanyAssignments?: Maybe<Array<Assignment>>;
  myNotificationCount: Scalars['Int']['output'];
  myNotifications: Array<Notification>;
  mySavedSearches: Array<SavedSearch>;
  myUnreadNotificationCount: Scalars['Int']['output'];
  plans: Array<Plan>;
  products: Array<StripeProduct>;
  remainingUsage: Array<Credit>;
  remainingUsageByCreditType: Credit;
  remainingUsageByProductSlug: Credit;
  reviewInformation: ReviewInformation;
  reviews: Array<Review>;
  savedSearch?: Maybe<SavedSearch>;
  savedSearches: Array<SavedSearch>;
  search: SearchResponse;
  sentAssignmentApplications?: Maybe<Array<AssignmentApplication>>;
  topBoxCompanies: Array<Contract>;
  user?: Maybe<User>;
  users: Array<User>;
  verificationGetCompany?: Maybe<VerificationCompanyResponse>;
  verificationSearchCompanies: Array<VerificationCompanySearch>;
  viewAssignmentDocument: Scalars['String']['output'];
};


export type QueryAllCompanyAssignmentApplicationsArgs = {
  companyId: Scalars['Int']['input'];
  cursor?: InputMaybe<AssignmentApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssignmentApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssignmentApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssignmentApplicationWhereInput>;
};


export type QueryApplicationProfileArgs = {
  cursor?: InputMaybe<ApplicationProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<ApplicationProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ApplicationProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ApplicationProfileWhereInput>;
};


export type QueryApplicationProfilesArgs = {
  cursor?: InputMaybe<ApplicationProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<ApplicationProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ApplicationProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ApplicationProfileWhereInput>;
};


export type QueryAssignmentArgs = {
  cursor?: InputMaybe<AssignmentWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssignmentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssignmentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssignmentWhereInput>;
};


export type QueryAssignmentAdminArgs = {
  cursor?: InputMaybe<AssignmentWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssignmentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssignmentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssignmentWhereInput>;
};


export type QueryAssignmentApplicationArgs = {
  cursor?: InputMaybe<AssignmentApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssignmentApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssignmentApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssignmentApplicationWhereInput>;
};


export type QueryAssignmentApplicationAdminArgs = {
  cursor?: InputMaybe<AssignmentApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssignmentApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssignmentApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssignmentApplicationWhereInput>;
};


export type QueryAssignmentApplicationsArgs = {
  cursor?: InputMaybe<AssignmentApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssignmentApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssignmentApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssignmentApplicationWhereInput>;
};


export type QueryAssignmentApplicationsAdminArgs = {
  cursor?: InputMaybe<AssignmentApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssignmentApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssignmentApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssignmentApplicationWhereInput>;
};


export type QueryAssignmentsArgs = {
  cursor?: InputMaybe<AssignmentWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssignmentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssignmentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssignmentWhereInput>;
};


export type QueryAssignmentsAdminArgs = {
  cursor?: InputMaybe<AssignmentWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssignmentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssignmentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssignmentWhereInput>;
};


export type QueryCanReviewArgs = {
  assignmentId: Scalars['Int']['input'];
  assignmentOwnerId: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
};


export type QueryCheckEmailChangeArgs = {
  token: Scalars['String']['input'];
};


export type QueryCheckInviteArgs = {
  inviteToken: Scalars['String']['input'];
};


export type QueryCheckoutArgs = {
  cursor?: InputMaybe<CheckoutWhereUniqueInput>;
  distinct?: InputMaybe<Array<CheckoutScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CheckoutOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CheckoutWhereInput>;
};


export type QueryCheckoutInvoiceArgs = {
  token: Scalars['String']['input'];
};


export type QueryCompaniesArgs = {
  cursor?: InputMaybe<CompanyWhereUniqueInput>;
  distinct?: InputMaybe<Array<CompanyScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CompanyOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CompanyWhereInput>;
};


export type QueryCompaniesPublicDataArgs = {
  cursor?: InputMaybe<CompanyWhereUniqueInput>;
  distinct?: InputMaybe<Array<CompanyScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CompanyOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CompanyWhereInput>;
};


export type QueryCompanyArgs = {
  cursor?: InputMaybe<CompanyWhereUniqueInput>;
  distinct?: InputMaybe<Array<CompanyScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CompanyOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CompanyWhereInput>;
};


export type QueryCompanyCheckArgs = {
  cocCountry: Scalars['String']['input'];
  cocNumber: Scalars['String']['input'];
};


export type QueryCompanyReferencesArgs = {
  cursor?: InputMaybe<CompanyReferenceWhereUniqueInput>;
  distinct?: InputMaybe<Array<CompanyReferenceScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<CompanyReferenceOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CompanyReferenceWhereInput>;
};


export type QueryContractsArgs = {
  cursor?: InputMaybe<ContractWhereUniqueInput>;
  distinct?: InputMaybe<Array<ContractScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ContractOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ContractWhereInput>;
};


export type QueryCountAllCompanyAssignmentApplicationsArgs = {
  companyId: Scalars['Int']['input'];
};


export type QueryCountAssignmentApplicationsArgs = {
  where: AssignmentApplicationWhereInput;
};


export type QueryCountAssignmentApplicationsAdminArgs = {
  where: AssignmentApplicationWhereInput;
};


export type QueryCountAssignmentsArgs = {
  where: AssignmentWhereInput;
};


export type QueryCountAssignmentsAdminArgs = {
  where: AssignmentWhereInput;
};


export type QueryCountCompaniesArgs = {
  where?: InputMaybe<CompanyWhereInput>;
};


export type QueryCountCurrentCompanyUsersArgs = {
  where: UserWhereInput;
};


export type QueryCountMyAssignmentsArgs = {
  where: AssignmentWhereInput;
};


export type QueryCountMyCompanyAssignmentsArgs = {
  where: AssignmentWhereInput;
};


export type QueryCountReviewsArgs = {
  where: ReviewWhereInput;
};


export type QueryCountSentAssignmentApplicationsArgs = {
  where: AssignmentApplicationWhereInput;
};


export type QueryCountUsersArgs = {
  where: UserWhereInput;
};


export type QueryCurrentCompanyUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryFileDownloadLinkArgs = {
  blobName: Scalars['String']['input'];
  containerName: Scalars['String']['input'];
};


export type QueryFileIsOwnerArgs = {
  blobName: Scalars['String']['input'];
  companyId: Scalars['Float']['input'];
  isOwner: Scalars['Boolean']['input'];
  ownerId: Scalars['Float']['input'];
};


export type QueryFileMetaDataArgs = {
  blobName: Scalars['String']['input'];
  containerName: Scalars['String']['input'];
};


export type QueryFileUploadLinkArgs = {
  blobName: Scalars['String']['input'];
  containerName: Scalars['String']['input'];
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryHasCompanyProfileArgs = {
  companyId: Scalars['Int']['input'];
};


export type QueryInvoicesArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryInvoicesAdminArgs = {
  companyId?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMyApplicationProfileArgs = {
  cursor?: InputMaybe<ApplicationProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<ApplicationProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ApplicationProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ApplicationProfileWhereInput>;
};


export type QueryMyApplicationProfilesArgs = {
  cursor?: InputMaybe<ApplicationProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<ApplicationProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ApplicationProfileOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ApplicationProfileWhereInput>;
};


export type QueryMyAssignmentArgs = {
  cursor?: InputMaybe<AssignmentWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssignmentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssignmentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssignmentWhereInput>;
};


export type QueryMyAssignmentsArgs = {
  cursor?: InputMaybe<AssignmentWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssignmentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssignmentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssignmentWhereInput>;
};


export type QueryMyCompanyAssignmentsArgs = {
  cursor?: InputMaybe<AssignmentWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssignmentScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssignmentOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssignmentWhereInput>;
};


export type QueryMyNotificationCountArgs = {
  where?: InputMaybe<NotificationWhereInput>;
};


export type QueryMyNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type QueryMySavedSearchesArgs = {
  cursor?: InputMaybe<SavedSearchWhereUniqueInput>;
  distinct?: InputMaybe<Array<SavedSearchScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SavedSearchOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SavedSearchWhereInput>;
};


export type QueryPlansArgs = {
  cursor?: InputMaybe<PlanWhereUniqueInput>;
  distinct?: InputMaybe<Array<PlanScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PlanOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PlanWhereInput>;
};


export type QueryRemainingUsageByCreditTypeArgs = {
  usageType: Scalars['String']['input'];
};


export type QueryRemainingUsageByProductSlugArgs = {
  productSlug: Scalars['String']['input'];
};


export type QueryReviewInformationArgs = {
  companyId: Scalars['Float']['input'];
};


export type QueryReviewsArgs = {
  cursor?: InputMaybe<ReviewWhereUniqueInput>;
  distinct?: InputMaybe<Array<ReviewScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ReviewOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ReviewWhereInput>;
};


export type QuerySavedSearchArgs = {
  markAsViewed?: Scalars['Boolean']['input'];
  where: SavedSearchFindUniqueInput;
};


export type QuerySavedSearchesArgs = {
  cursor?: InputMaybe<SavedSearchWhereUniqueInput>;
  distinct?: InputMaybe<Array<SavedSearchScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<SavedSearchOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SavedSearchWhereInput>;
};


export type QuerySearchArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  query: SearchQueryInput;
  showFavoritesOnly?: Scalars['Boolean']['input'];
  sortMethod?: Scalars['String']['input'];
};


export type QuerySentAssignmentApplicationsArgs = {
  cursor?: InputMaybe<AssignmentApplicationWhereUniqueInput>;
  distinct?: InputMaybe<Array<AssignmentApplicationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AssignmentApplicationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AssignmentApplicationWhereInput>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryVerificationGetCompanyArgs = {
  countryCode: VerificationCountryCodes;
  identificationNumber: Scalars['String']['input'];
};


export type QueryVerificationSearchCompaniesArgs = {
  countryCode: VerificationCountryCodes;
  page?: InputMaybe<Scalars['Float']['input']>;
  pageSize?: InputMaybe<Scalars['Float']['input']>;
  query: Scalars['String']['input'];
};


export type QueryViewAssignmentDocumentArgs = {
  assignmentId: Scalars['Int']['input'];
};

export enum RateType {
  Agreement = 'AGREEMENT',
  Fixed = 'FIXED',
  Hour = 'HOUR',
  Marketconform = 'MARKETCONFORM',
  Month = 'MONTH',
  Unit = 'UNIT',
  Unknown = 'UNKNOWN',
  Week = 'WEEK'
}

export type RegisterOutput = {
  __typename?: 'RegisterOutput';
  success: Scalars['String']['output'];
};

export enum RenewalInterval {
  HalfYear = 'HALF_YEAR',
  Month = 'MONTH',
  Quarter = 'QUARTER',
  Year = 'YEAR'
}

export type RequestEmailChangeOutput = {
  __typename?: 'RequestEmailChangeOutput';
  success: Scalars['Boolean']['output'];
};

export type RequestInvitationOutput = {
  __typename?: 'RequestInvitationOutput';
  success: Scalars['Boolean']['output'];
};

export type Review = {
  __typename?: 'Review';
  assignment?: Maybe<Assignment>;
  assignmentId?: Maybe<Scalars['Int']['output']>;
  company: Company;
  companyId: Scalars['Int']['output'];
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  createdById: Scalars['Int']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  receivedBy: User;
  receivedById: Scalars['Int']['output'];
  type: ReviewType;
  updatedAt: Scalars['DateTime']['output'];
};

export type ReviewAvgAggregate = {
  __typename?: 'ReviewAvgAggregate';
  assignmentId?: Maybe<Scalars['Float']['output']>;
  companyId?: Maybe<Scalars['Float']['output']>;
  createdById?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  receivedById?: Maybe<Scalars['Float']['output']>;
};

export type ReviewCountAggregate = {
  __typename?: 'ReviewCountAggregate';
  _all: Scalars['Int']['output'];
  assignmentId: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  content: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  createdById: Scalars['Int']['output'];
  deletedAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  receivedById: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type ReviewCreateInput = {
  assignment?: InputMaybe<AssignmentCreateNestedOneWithoutReviewInput>;
  company: CompanyCreateNestedOneWithoutReviewsInput;
  content?: InputMaybe<Scalars['String']['input']>;
  createdBy: UserCreateNestedOneWithoutCreatedReviewsInput;
  receivedBy: UserCreateNestedOneWithoutReceivedReviewsInput;
  type: ReviewType;
};

export type ReviewInformation = {
  __typename?: 'ReviewInformation';
  tip: Scalars['Float']['output'];
  top: Scalars['Float']['output'];
};

export type ReviewMaxAggregate = {
  __typename?: 'ReviewMaxAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdById?: Maybe<Scalars['Int']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  receivedById?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<ReviewType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ReviewMinAggregate = {
  __typename?: 'ReviewMinAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdById?: Maybe<Scalars['Int']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  receivedById?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<ReviewType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ReviewOrderByWithRelationInput = {
  assignment?: InputMaybe<AssignmentOrderByWithRelationInput>;
  assignmentId?: InputMaybe<SortOrderInput>;
  company?: InputMaybe<CompanyOrderByWithRelationInput>;
  companyId?: InputMaybe<SortOrder>;
  content?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  createdBy?: InputMaybe<UserOrderByWithRelationInput>;
  createdById?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  receivedBy?: InputMaybe<UserOrderByWithRelationInput>;
  receivedById?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum ReviewScalarFieldEnum {
  AssignmentId = 'assignmentId',
  CompanyId = 'companyId',
  Content = 'content',
  CreatedAt = 'createdAt',
  CreatedById = 'createdById',
  DeletedAt = 'deletedAt',
  Id = 'id',
  ReceivedById = 'receivedById',
  Type = 'type',
  UpdatedAt = 'updatedAt'
}

export type ReviewSumAggregate = {
  __typename?: 'ReviewSumAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  createdById?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  receivedById?: Maybe<Scalars['Int']['output']>;
};

export enum ReviewType {
  Tip = 'TIP',
  Top = 'TOP'
}

export type ReviewUnique_Review_ConstraintCompoundUniqueInput = {
  assignmentId: Scalars['Int']['input'];
  companyId: Scalars['Int']['input'];
  createdById: Scalars['Int']['input'];
  receivedById: Scalars['Int']['input'];
};

export type ReviewWhereInput = {
  AND?: InputMaybe<Array<ReviewWhereInput>>;
  NOT?: InputMaybe<Array<ReviewWhereInput>>;
  OR?: InputMaybe<Array<ReviewWhereInput>>;
  assignment?: InputMaybe<AssignmentNullableRelationFilter>;
  assignmentId?: InputMaybe<IntNullableFilter>;
  company?: InputMaybe<CompanyRelationFilter>;
  companyId?: InputMaybe<IntFilter>;
  content?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserRelationFilter>;
  createdById?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  receivedBy?: InputMaybe<UserRelationFilter>;
  receivedById?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumReviewTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ReviewWhereUniqueInput = {
  AND?: InputMaybe<Array<ReviewWhereInput>>;
  NOT?: InputMaybe<Array<ReviewWhereInput>>;
  OR?: InputMaybe<Array<ReviewWhereInput>>;
  assignment?: InputMaybe<AssignmentNullableRelationFilter>;
  assignmentId?: InputMaybe<IntNullableFilter>;
  company?: InputMaybe<CompanyRelationFilter>;
  companyId?: InputMaybe<IntFilter>;
  content?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdBy?: InputMaybe<UserRelationFilter>;
  createdById?: InputMaybe<IntFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  receivedBy?: InputMaybe<UserRelationFilter>;
  receivedById?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumReviewTypeFilter>;
  unique_review_constraint?: InputMaybe<ReviewUnique_Review_ConstraintCompoundUniqueInput>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SavedSearch = {
  __typename?: 'SavedSearch';
  _count: SavedSearchCount;
  batchAlert: Scalars['Boolean']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  expertises?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  instantAlert: Scalars['Boolean']['output'];
  lastViewedAt: Scalars['DateTime']['output'];
  locations?: Maybe<Scalars['String']['output']>;
  matches?: Maybe<Array<Match>>;
  maxHoursPerWeek?: Maybe<Scalars['Int']['output']>;
  minHoursPerWeek?: Maybe<Scalars['Int']['output']>;
  newMatchesCount: Scalars['Int']['output'];
  noMatchingIntermediaries: Scalars['Boolean']['output'];
  onLocation: Scalars['Boolean']['output'];
  searchTags?: Maybe<Scalars['String']['output']>;
  type?: Maybe<SavedSearchType>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type SavedSearchAvgAggregate = {
  __typename?: 'SavedSearchAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  maxHoursPerWeek?: Maybe<Scalars['Float']['output']>;
  minHoursPerWeek?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type SavedSearchCount = {
  __typename?: 'SavedSearchCount';
  matches: Scalars['Int']['output'];
};

export type SavedSearchCountAggregate = {
  __typename?: 'SavedSearchCountAggregate';
  _all: Scalars['Int']['output'];
  batchAlert: Scalars['Int']['output'];
  deletedAt: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  expertises: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  instantAlert: Scalars['Int']['output'];
  lastViewedAt: Scalars['Int']['output'];
  locations: Scalars['Int']['output'];
  maxHoursPerWeek: Scalars['Int']['output'];
  minHoursPerWeek: Scalars['Int']['output'];
  noMatchingIntermediaries: Scalars['Int']['output'];
  onLocation: Scalars['Int']['output'];
  searchTags: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type SavedSearchCreateInput = {
  batchAlert?: InputMaybe<Scalars['Boolean']['input']>;
  description: Scalars['String']['input'];
  expertises?: InputMaybe<Scalars['String']['input']>;
  instantAlert?: InputMaybe<Scalars['Boolean']['input']>;
  lastViewedAt?: InputMaybe<Scalars['DateTime']['input']>;
  locations?: InputMaybe<Scalars['String']['input']>;
  maxHoursPerWeek?: InputMaybe<Scalars['Int']['input']>;
  minHoursPerWeek?: InputMaybe<Scalars['Int']['input']>;
  noMatchingIntermediaries?: InputMaybe<Scalars['Boolean']['input']>;
  onLocation?: InputMaybe<Scalars['Boolean']['input']>;
  searchTags?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SavedSearchType>;
};

export type SavedSearchFindUniqueInput = {
  id: Scalars['Int']['input'];
};

export type SavedSearchMaxAggregate = {
  __typename?: 'SavedSearchMaxAggregate';
  batchAlert?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expertises?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  instantAlert?: Maybe<Scalars['Boolean']['output']>;
  lastViewedAt?: Maybe<Scalars['DateTime']['output']>;
  locations?: Maybe<Scalars['String']['output']>;
  maxHoursPerWeek?: Maybe<Scalars['Int']['output']>;
  minHoursPerWeek?: Maybe<Scalars['Int']['output']>;
  noMatchingIntermediaries?: Maybe<Scalars['Boolean']['output']>;
  onLocation?: Maybe<Scalars['Boolean']['output']>;
  searchTags?: Maybe<Scalars['String']['output']>;
  type?: Maybe<SavedSearchType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type SavedSearchMinAggregate = {
  __typename?: 'SavedSearchMinAggregate';
  batchAlert?: Maybe<Scalars['Boolean']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  expertises?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  instantAlert?: Maybe<Scalars['Boolean']['output']>;
  lastViewedAt?: Maybe<Scalars['DateTime']['output']>;
  locations?: Maybe<Scalars['String']['output']>;
  maxHoursPerWeek?: Maybe<Scalars['Int']['output']>;
  minHoursPerWeek?: Maybe<Scalars['Int']['output']>;
  noMatchingIntermediaries?: Maybe<Scalars['Boolean']['output']>;
  onLocation?: Maybe<Scalars['Boolean']['output']>;
  searchTags?: Maybe<Scalars['String']['output']>;
  type?: Maybe<SavedSearchType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type SavedSearchOrderByWithRelationInput = {
  batchAlert?: InputMaybe<SortOrder>;
  deletedAt?: InputMaybe<SortOrderInput>;
  description?: InputMaybe<SortOrder>;
  expertises?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  instantAlert?: InputMaybe<SortOrder>;
  lastViewedAt?: InputMaybe<SortOrder>;
  locations?: InputMaybe<SortOrderInput>;
  maxHoursPerWeek?: InputMaybe<SortOrderInput>;
  minHoursPerWeek?: InputMaybe<SortOrderInput>;
  noMatchingIntermediaries?: InputMaybe<SortOrder>;
  onLocation?: InputMaybe<SortOrder>;
  searchTags?: InputMaybe<SortOrderInput>;
  type?: InputMaybe<SortOrderInput>;
  updatedAt?: InputMaybe<SortOrder>;
  userId?: InputMaybe<SortOrderInput>;
};

export enum SavedSearchScalarFieldEnum {
  BatchAlert = 'batchAlert',
  DeletedAt = 'deletedAt',
  Description = 'description',
  Expertises = 'expertises',
  Id = 'id',
  InstantAlert = 'instantAlert',
  LastViewedAt = 'lastViewedAt',
  Locations = 'locations',
  MaxHoursPerWeek = 'maxHoursPerWeek',
  MinHoursPerWeek = 'minHoursPerWeek',
  NoMatchingIntermediaries = 'noMatchingIntermediaries',
  OnLocation = 'onLocation',
  SearchTags = 'searchTags',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type SavedSearchSumAggregate = {
  __typename?: 'SavedSearchSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  maxHoursPerWeek?: Maybe<Scalars['Int']['output']>;
  minHoursPerWeek?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export enum SavedSearchType {
  Database = 'DATABASE',
  Textkernel = 'TEXTKERNEL'
}

export type SavedSearchUpdateInput = {
  batchAlert?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expertises?: InputMaybe<Scalars['String']['input']>;
  instantAlert?: InputMaybe<Scalars['Boolean']['input']>;
  lastViewedAt?: InputMaybe<Scalars['DateTime']['input']>;
  locations?: InputMaybe<Scalars['String']['input']>;
  maxHoursPerWeek?: InputMaybe<Scalars['Int']['input']>;
  minHoursPerWeek?: InputMaybe<Scalars['Int']['input']>;
  noMatchingIntermediaries?: InputMaybe<Scalars['Boolean']['input']>;
  onLocation?: InputMaybe<Scalars['Boolean']['input']>;
  searchTags?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SavedSearchType>;
};

export type SavedSearchWhereInput = {
  AND?: InputMaybe<Array<SavedSearchWhereInput>>;
  NOT?: InputMaybe<Array<SavedSearchWhereInput>>;
  OR?: InputMaybe<Array<SavedSearchWhereInput>>;
  batchAlert?: InputMaybe<BoolFilter>;
  deletedAt?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringFilter>;
  expertises?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  instantAlert?: InputMaybe<BoolFilter>;
  lastViewedAt?: InputMaybe<DateTimeFilter>;
  locations?: InputMaybe<StringNullableFilter>;
  maxHoursPerWeek?: InputMaybe<IntNullableFilter>;
  minHoursPerWeek?: InputMaybe<IntNullableFilter>;
  noMatchingIntermediaries?: InputMaybe<BoolFilter>;
  onLocation?: InputMaybe<BoolFilter>;
  searchTags?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumSavedSearchTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<IntNullableFilter>;
};

export type SavedSearchWhereUniqueInput = {
  AND?: InputMaybe<Array<SavedSearchWhereInput>>;
  NOT?: InputMaybe<Array<SavedSearchWhereInput>>;
  OR?: InputMaybe<Array<SavedSearchWhereInput>>;
  batchAlert?: InputMaybe<BoolFilter>;
  deletedAt?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringFilter>;
  expertises?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  instantAlert?: InputMaybe<BoolFilter>;
  lastViewedAt?: InputMaybe<DateTimeFilter>;
  locations?: InputMaybe<StringNullableFilter>;
  maxHoursPerWeek?: InputMaybe<IntNullableFilter>;
  minHoursPerWeek?: InputMaybe<IntNullableFilter>;
  noMatchingIntermediaries?: InputMaybe<BoolFilter>;
  onLocation?: InputMaybe<BoolFilter>;
  searchTags?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumSavedSearchTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<IntNullableFilter>;
};

export type SearchQueryInput = {
  expertises?: InputMaybe<Array<Scalars['String']['input']>>;
  hoursFrom?: InputMaybe<Scalars['Float']['input']>;
  hoursTo?: InputMaybe<Scalars['Float']['input']>;
  locations?: InputMaybe<Array<Scalars['String']['input']>>;
  noMatchingIntermediaries: Scalars['Boolean']['input'];
  onLocation: Scalars['Boolean']['input'];
  publishAtFrom?: InputMaybe<Scalars['DateTime']['input']>;
  searchTags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  count: Scalars['Int']['output'];
  results: Array<SearchResult>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  assignment: Assignment;
  docID: Scalars['ID']['output'];
  score: Scalars['Float']['output'];
};

export type Setting = {
  __typename?: 'Setting';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  type: SettingType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
  value: Scalars['String']['output'];
};

export type SettingAvgAggregate = {
  __typename?: 'SettingAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type SettingCountAggregate = {
  __typename?: 'SettingCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  key: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
  value: Scalars['Int']['output'];
};

export type SettingMaxAggregate = {
  __typename?: 'SettingMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  type?: Maybe<SettingType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type SettingMinAggregate = {
  __typename?: 'SettingMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  type?: Maybe<SettingType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type SettingSumAggregate = {
  __typename?: 'SettingSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export enum SettingType {
  Communication = 'COMMUNICATION'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type SortOrderInput = {
  nulls?: InputMaybe<NullsOrder>;
  sort: SortOrder;
};

export type Status = {
  __typename?: 'Status';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  modelId?: Maybe<Scalars['Int']['output']>;
  modelType: StatusModelType;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type StatusAvgAggregate = {
  __typename?: 'StatusAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  modelId?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type StatusCountAggregate = {
  __typename?: 'StatusCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  description: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  key: Scalars['Int']['output'];
  modelId: Scalars['Int']['output'];
  modelType: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type StatusListRelationFilter = {
  every?: InputMaybe<StatusWhereInput>;
  none?: InputMaybe<StatusWhereInput>;
  some?: InputMaybe<StatusWhereInput>;
};

export type StatusMaxAggregate = {
  __typename?: 'StatusMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  modelId?: Maybe<Scalars['Int']['output']>;
  modelType?: Maybe<StatusModelType>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type StatusMinAggregate = {
  __typename?: 'StatusMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  modelId?: Maybe<Scalars['Int']['output']>;
  modelType?: Maybe<StatusModelType>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export enum StatusModelType {
  Assignment = 'ASSIGNMENT',
  AssignmentApplication = 'ASSIGNMENT_APPLICATION',
  User = 'USER'
}

export type StatusOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type StatusSumAggregate = {
  __typename?: 'StatusSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  modelId?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type StatusWhereInput = {
  AND?: InputMaybe<Array<StatusWhereInput>>;
  NOT?: InputMaybe<Array<StatusWhereInput>>;
  OR?: InputMaybe<Array<StatusWhereInput>>;
  description?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  key?: InputMaybe<StringFilter>;
  modelId?: InputMaybe<IntNullableFilter>;
  modelType?: InputMaybe<EnumStatusModelTypeFilter>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StripePrice = {
  __typename?: 'StripePrice';
  active: Scalars['Boolean']['output'];
  created: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  livemode: Scalars['Boolean']['output'];
  lookup_key?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  object: Scalars['String']['output'];
  product: Scalars['String']['output'];
  recurring?: Maybe<StripePriceRecurring>;
  tax_behavior?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  unit_amount?: Maybe<Scalars['Float']['output']>;
  unit_amount_decimal?: Maybe<Scalars['String']['output']>;
};

export type StripePriceRecurring = {
  __typename?: 'StripePriceRecurring';
  aggregate_usage?: Maybe<Scalars['String']['output']>;
  interval: Scalars['String']['output'];
  interval_count: Scalars['Float']['output'];
  trial_period_days?: Maybe<Scalars['Float']['output']>;
  usage_type: Scalars['String']['output'];
};

export type StripeProduct = {
  __typename?: 'StripeProduct';
  active: Scalars['Boolean']['output'];
  created: Scalars['Float']['output'];
  default_price?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  livemode: Scalars['Boolean']['output'];
  metadata: StripeProductMetadata;
  modeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  object: Scalars['String']['output'];
  prices?: Maybe<Array<StripePrice>>;
  type: Scalars['String']['output'];
  unit_label?: Maybe<Scalars['String']['output']>;
  updated: Scalars['Float']['output'];
};

export type StripeProductMetadata = {
  __typename?: 'StripeProductMetadata';
  order?: Maybe<Scalars['Float']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type StripeSession = {
  __typename?: 'StripeSession';
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  cancel_url?: Maybe<Scalars['String']['output']>;
  client_reference_id?: Maybe<Scalars['String']['output']>;
  created: Scalars['Float']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  expires_at: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  invoice?: Maybe<Scalars['String']['output']>;
  livemode: Scalars['Boolean']['output'];
  mode: Scalars['String']['output'];
  payment_intent?: Maybe<Scalars['String']['output']>;
  payment_link?: Maybe<Scalars['String']['output']>;
  payment_method_collection?: Maybe<Scalars['String']['output']>;
  payment_method_configuration_details?: Maybe<Scalars['String']['output']>;
  payment_method_options?: Maybe<Scalars['String']['output']>;
  payment_method_types: Array<Scalars['String']['output']>;
  payment_status: Scalars['String']['output'];
  status?: Maybe<Scalars['String']['output']>;
  submit_type?: Maybe<Scalars['String']['output']>;
  subscription?: Maybe<Scalars['String']['output']>;
  success_url?: Maybe<Scalars['String']['output']>;
  total_details?: Maybe<TotalDetails>;
  url?: Maybe<Scalars['String']['output']>;
};

export type StripeSubscription = {
  __typename?: 'StripeSubscription';
  billing_cycle_anchor?: Maybe<Scalars['Float']['output']>;
  cancel_at?: Maybe<Scalars['Float']['output']>;
  cancel_at_period_end?: Maybe<Scalars['Boolean']['output']>;
  canceled_at?: Maybe<Scalars['Float']['output']>;
  collection_method: Scalars['String']['output'];
  created?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  current_period_end?: Maybe<Scalars['Float']['output']>;
  current_period_start?: Maybe<Scalars['Float']['output']>;
  customer?: Maybe<Scalars['String']['output']>;
  days_until_due?: Maybe<Scalars['Float']['output']>;
  default_payment_method?: Maybe<Scalars['String']['output']>;
  default_source?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  ended_at?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  items?: Maybe<StripeSubscriptionItemList>;
  latest_invoice?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<StripeSubscriptionMetadata>;
  object?: Maybe<Scalars['String']['output']>;
  start_date?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type StripeSubscriptionItem = {
  __typename?: 'StripeSubscriptionItem';
  created: Scalars['Float']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  object: Scalars['String']['output'];
  price: StripePrice;
  quantity?: Maybe<Scalars['Float']['output']>;
  subscription: Scalars['String']['output'];
};

export type StripeSubscriptionItemList = {
  __typename?: 'StripeSubscriptionItemList';
  data: Array<StripeSubscriptionItem>;
  has_more: Scalars['Boolean']['output'];
  object: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type StripeSubscriptionMetadata = {
  __typename?: 'StripeSubscriptionMetadata';
  companyId?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type TotalDetails = {
  __typename?: 'TotalDetails';
  amount_tax?: Maybe<Scalars['Float']['output']>;
};

export type UpdateContractOutput = {
  __typename?: 'UpdateContractOutput';
  isSuccess: Scalars['Boolean']['output'];
};

export type UpdateUserCompanyRolesInput = {
  role?: InputMaybe<UserCompanyRole>;
};

export type UpdateUsersCompaniesInput = {
  userCompanyRole: UpdateUserCompanyRolesInput;
};

export type UploadLink = {
  __typename?: 'UploadLink';
  blobName: Scalars['String']['output'];
  expiresOn?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
};

export type UsageAvgAggregate = {
  __typename?: 'UsageAvgAggregate';
  amount?: Maybe<Scalars['Float']['output']>;
  companyId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  objectId?: Maybe<Scalars['Float']['output']>;
};

export type UsageCountAggregate = {
  __typename?: 'UsageCountAggregate';
  _all: Scalars['Int']['output'];
  amount: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  created: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  objectId: Scalars['Int']['output'];
  type: Scalars['Int']['output'];
};

export type UsageMaxAggregate = {
  __typename?: 'UsageMaxAggregate';
  amount?: Maybe<Scalars['Int']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  objectId?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<UsageType>;
};

export type UsageMinAggregate = {
  __typename?: 'UsageMinAggregate';
  amount?: Maybe<Scalars['Int']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  created?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  objectId?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<UsageType>;
};

export type UsageSumAggregate = {
  __typename?: 'UsageSumAggregate';
  amount?: Maybe<Scalars['Int']['output']>;
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  objectId?: Maybe<Scalars['Int']['output']>;
};

export enum UsageType {
  Assignment = 'ASSIGNMENT',
  AssignmentApplication = 'ASSIGNMENT_APPLICATION',
  AssignmentView = 'ASSIGNMENT_VIEW',
  CompanyPremiumProfile = 'COMPANY_PREMIUM_PROFILE',
  TopBox = 'TOP_BOX'
}

export type User = {
  __typename?: 'User';
  _count: UserCount;
  assignmentApplications?: Maybe<Array<AssignmentApplication>>;
  assignmentRead?: Maybe<Array<AssignmentRead>>;
  assignments?: Maybe<Array<Assignment>>;
  confirmationToken?: Maybe<Scalars['String']['output']>;
  confirmationTokenCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  confirmedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdReviews?: Maybe<Array<Review>>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  emailChange?: Maybe<Scalars['String']['output']>;
  externalId: Scalars['String']['output'];
  favorites?: Maybe<Array<UserFavorite>>;
  files?: Maybe<Array<File>>;
  firebaseUid?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  linkedInUrl?: Maybe<Scalars['String']['output']>;
  notifications: Array<Notification>;
  passwordResetTokenCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  profilePhoto?: Maybe<File>;
  profilePhotoFileId?: Maybe<Scalars['Int']['output']>;
  receivedReviews?: Maybe<Array<Review>>;
  role: UserRole;
  savedSearches?: Maybe<Array<SavedSearch>>;
  settings?: Maybe<Array<Setting>>;
  statuses?: Maybe<Array<Status>>;
  termsConditionsAcceptedAt?: Maybe<Scalars['DateTime']['output']>;
  termsConditionsVersion?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userCompanies?: Maybe<Array<UsersCompanies>>;
};

export type UserAvgAggregate = {
  __typename?: 'UserAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  profilePhotoFileId?: Maybe<Scalars['Float']['output']>;
};

export enum UserCompanyRole {
  Collaborator = 'COLLABORATOR',
  Owner = 'OWNER',
  Supervisor = 'SUPERVISOR'
}

export type UserCount = {
  __typename?: 'UserCount';
  applicationProfiles: Scalars['Int']['output'];
  assignmentApplications: Scalars['Int']['output'];
  assignmentRead: Scalars['Int']['output'];
  assignments: Scalars['Int']['output'];
  createdReviews: Scalars['Int']['output'];
  favorites: Scalars['Int']['output'];
  files: Scalars['Int']['output'];
  receivedReviews: Scalars['Int']['output'];
  savedSearches: Scalars['Int']['output'];
  settings: Scalars['Int']['output'];
  statuses: Scalars['Int']['output'];
  userCompanies: Scalars['Int']['output'];
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  _all: Scalars['Int']['output'];
  confirmationToken: Scalars['Int']['output'];
  confirmationTokenCreatedAt: Scalars['Int']['output'];
  confirmedAt: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  dateOfBirth: Scalars['Int']['output'];
  email: Scalars['Int']['output'];
  emailChange: Scalars['Int']['output'];
  externalId: Scalars['Int']['output'];
  firebaseUid: Scalars['Int']['output'];
  firstName: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['Int']['output'];
  linkedInUrl: Scalars['Int']['output'];
  passwordResetTokenCreatedAt: Scalars['Int']['output'];
  phoneNumber: Scalars['Int']['output'];
  profilePhotoFileId: Scalars['Int']['output'];
  role: Scalars['Int']['output'];
  termsConditionsAcceptedAt: Scalars['Int']['output'];
  termsConditionsVersion: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type UserCreateNestedOneWithoutCreatedReviewsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCreatedReviewsInput>;
  create?: InputMaybe<UserCreateWithoutCreatedReviewsInput>;
};

export type UserCreateNestedOneWithoutReceivedReviewsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutReceivedReviewsInput>;
  create?: InputMaybe<UserCreateWithoutReceivedReviewsInput>;
};

export type UserCreateOrConnectWithoutCreatedReviewsInput = {
  create: UserCreateWithoutCreatedReviewsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutReceivedReviewsInput = {
  create: UserCreateWithoutReceivedReviewsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutCreatedReviewsInput = {
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  emailChange?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  firebaseUid?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  linkedInUrl?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePhoto?: InputMaybe<FileCreateNestedOneWithoutUserInput>;
  termsConditionsAcceptedAt?: InputMaybe<Scalars['DateTime']['input']>;
  termsConditionsVersion?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreateWithoutReceivedReviewsInput = {
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  emailChange?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  firebaseUid?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  linkedInUrl?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePhoto?: InputMaybe<FileCreateNestedOneWithoutUserInput>;
  termsConditionsAcceptedAt?: InputMaybe<Scalars['DateTime']['input']>;
  termsConditionsVersion?: InputMaybe<Scalars['String']['input']>;
};

export type UserFavorite = {
  __typename?: 'UserFavorite';
  assignment: Assignment;
  assignmentId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  favorite: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export type UserFavoriteAvgAggregate = {
  __typename?: 'UserFavoriteAvgAggregate';
  assignmentId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type UserFavoriteCountAggregate = {
  __typename?: 'UserFavoriteCountAggregate';
  _all: Scalars['Int']['output'];
  assignmentId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  favorite: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type UserFavoriteMaxAggregate = {
  __typename?: 'UserFavoriteMaxAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  favorite?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type UserFavoriteMinAggregate = {
  __typename?: 'UserFavoriteMinAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  favorite?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type UserFavoriteSumAggregate = {
  __typename?: 'UserFavoriteSumAggregate';
  assignmentId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type UserInformationAvgAggregate = {
  __typename?: 'UserInformationAvgAggregate';
  unreadNotificationCount?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type UserInformationCountAggregate = {
  __typename?: 'UserInformationCountAggregate';
  _all: Scalars['Int']['output'];
  unreadNotificationCount: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type UserInformationMaxAggregate = {
  __typename?: 'UserInformationMaxAggregate';
  unreadNotificationCount?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type UserInformationMinAggregate = {
  __typename?: 'UserInformationMinAggregate';
  unreadNotificationCount?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type UserInformationSumAggregate = {
  __typename?: 'UserInformationSumAggregate';
  unreadNotificationCount?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type UserMaxAggregate = {
  __typename?: 'UserMaxAggregate';
  confirmationToken?: Maybe<Scalars['String']['output']>;
  confirmationTokenCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  confirmedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailChange?: Maybe<Scalars['String']['output']>;
  externalId?: Maybe<Scalars['String']['output']>;
  firebaseUid?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  linkedInUrl?: Maybe<Scalars['String']['output']>;
  passwordResetTokenCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  profilePhotoFileId?: Maybe<Scalars['Int']['output']>;
  role?: Maybe<UserRole>;
  termsConditionsAcceptedAt?: Maybe<Scalars['DateTime']['output']>;
  termsConditionsVersion?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  confirmationToken?: Maybe<Scalars['String']['output']>;
  confirmationTokenCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  confirmedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailChange?: Maybe<Scalars['String']['output']>;
  externalId?: Maybe<Scalars['String']['output']>;
  firebaseUid?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  linkedInUrl?: Maybe<Scalars['String']['output']>;
  passwordResetTokenCreatedAt?: Maybe<Scalars['DateTime']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  profilePhotoFileId?: Maybe<Scalars['Int']['output']>;
  role?: Maybe<UserRole>;
  termsConditionsAcceptedAt?: Maybe<Scalars['DateTime']['output']>;
  termsConditionsVersion?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserNullableRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  dateOfBirth?: InputMaybe<SortOrderInput>;
  email?: InputMaybe<SortOrder>;
  emailChange?: InputMaybe<SortOrderInput>;
  externalId?: InputMaybe<SortOrder>;
  firebaseUid?: InputMaybe<SortOrderInput>;
  firstName?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrderInput>;
  linkedInUrl?: InputMaybe<SortOrderInput>;
  phoneNumber?: InputMaybe<SortOrderInput>;
  profilePhoto?: InputMaybe<FileOrderByWithRelationInput>;
  profilePhotoFileId?: InputMaybe<SortOrderInput>;
  statuses?: InputMaybe<StatusOrderByRelationAggregateInput>;
  termsConditionsAcceptedAt?: InputMaybe<SortOrderInput>;
  termsConditionsVersion?: InputMaybe<SortOrderInput>;
  updatedAt?: InputMaybe<SortOrder>;
  userCompanies?: InputMaybe<UsersCompaniesOrderByRelationAggregateInput>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Service = 'SERVICE',
  User = 'USER'
}

export enum UserScalarFieldEnum {
  ConfirmationToken = 'confirmationToken',
  ConfirmationTokenCreatedAt = 'confirmationTokenCreatedAt',
  ConfirmedAt = 'confirmedAt',
  CreatedAt = 'createdAt',
  DateOfBirth = 'dateOfBirth',
  DeletedAt = 'deletedAt',
  Email = 'email',
  EmailChange = 'emailChange',
  EmailChangeToken = 'emailChangeToken',
  EmailChangeTokenCreatedAt = 'emailChangeTokenCreatedAt',
  ExternalId = 'externalId',
  FirebaseUid = 'firebaseUid',
  FirstName = 'firstName',
  Id = 'id',
  LastName = 'lastName',
  LegacyPassword = 'legacyPassword',
  LegacySalt = 'legacySalt',
  LinkedInUrl = 'linkedInUrl',
  PasswordResetToken = 'passwordResetToken',
  PasswordResetTokenCreatedAt = 'passwordResetTokenCreatedAt',
  PhoneNumber = 'phoneNumber',
  ProfilePhotoFileId = 'profilePhotoFileId',
  Role = 'role',
  TermsConditionsAcceptedAt = 'termsConditionsAcceptedAt',
  TermsConditionsVersion = 'termsConditionsVersion',
  UpdatedAt = 'updatedAt'
}

export type UserSumAggregate = {
  __typename?: 'UserSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  profilePhotoFileId?: Maybe<Scalars['Int']['output']>;
};

export type UserUpdateInput = {
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  linkedInUrl?: InputMaybe<Scalars['String']['input']>;
  passwordResetToken?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  dateOfBirth?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  emailChange?: InputMaybe<StringNullableFilter>;
  externalId?: InputMaybe<StringFilter>;
  firebaseUid?: InputMaybe<StringNullableFilter>;
  firstName?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  linkedInUrl?: InputMaybe<StringNullableFilter>;
  phoneNumber?: InputMaybe<StringNullableFilter>;
  profilePhoto?: InputMaybe<FileNullableRelationFilter>;
  profilePhotoFileId?: InputMaybe<IntNullableFilter>;
  statuses?: InputMaybe<StatusListRelationFilter>;
  termsConditionsAcceptedAt?: InputMaybe<DateTimeNullableFilter>;
  termsConditionsVersion?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userCompanies?: InputMaybe<UsersCompaniesListRelationFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  dateOfBirth?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailChange?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  firebaseUid?: InputMaybe<StringNullableFilter>;
  firstName?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  lastName?: InputMaybe<StringNullableFilter>;
  linkedInUrl?: InputMaybe<StringNullableFilter>;
  phoneNumber?: InputMaybe<StringNullableFilter>;
  profilePhoto?: InputMaybe<FileNullableRelationFilter>;
  profilePhotoFileId?: InputMaybe<Scalars['Int']['input']>;
  statuses?: InputMaybe<StatusListRelationFilter>;
  termsConditionsAcceptedAt?: InputMaybe<DateTimeNullableFilter>;
  termsConditionsVersion?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userCompanies?: InputMaybe<UsersCompaniesListRelationFilter>;
};

export type UsersCompanies = {
  __typename?: 'UsersCompanies';
  _count: UsersCompaniesCount;
  apiKey: Scalars['String']['output'];
  company: Company;
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  status: UsersCompaniesStatus;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userCompanyRoles?: Maybe<Array<UsersCompanyRoles>>;
  userId: Scalars['Int']['output'];
};

export type UsersCompaniesAvgAggregate = {
  __typename?: 'UsersCompaniesAvgAggregate';
  companyId?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['Float']['output']>;
};

export type UsersCompaniesCount = {
  __typename?: 'UsersCompaniesCount';
  userCompanyRoles: Scalars['Int']['output'];
};

export type UsersCompaniesCountAggregate = {
  __typename?: 'UsersCompaniesCountAggregate';
  _all: Scalars['Int']['output'];
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  status: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export type UsersCompaniesListRelationFilter = {
  every?: InputMaybe<UsersCompaniesWhereInput>;
  none?: InputMaybe<UsersCompaniesWhereInput>;
  some?: InputMaybe<UsersCompaniesWhereInput>;
};

export type UsersCompaniesMaxAggregate = {
  __typename?: 'UsersCompaniesMaxAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<UsersCompaniesStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type UsersCompaniesMinAggregate = {
  __typename?: 'UsersCompaniesMinAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<UsersCompaniesStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type UsersCompaniesOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum UsersCompaniesStatus {
  Active = 'ACTIVE',
  Invited = 'INVITED',
  Requested = 'REQUESTED'
}

export type UsersCompaniesSumAggregate = {
  __typename?: 'UsersCompaniesSumAggregate';
  companyId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type UsersCompaniesUserIdCompanyIdCompoundUniqueInput = {
  companyId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type UsersCompaniesWhereInput = {
  AND?: InputMaybe<Array<UsersCompaniesWhereInput>>;
  NOT?: InputMaybe<Array<UsersCompaniesWhereInput>>;
  OR?: InputMaybe<Array<UsersCompaniesWhereInput>>;
  companyId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userCompanyRoles?: InputMaybe<UsersCompanyRolesListRelationFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type UsersCompaniesWhereUniqueInput = {
  AND?: InputMaybe<Array<UsersCompaniesWhereInput>>;
  NOT?: InputMaybe<Array<UsersCompaniesWhereInput>>;
  OR?: InputMaybe<Array<UsersCompaniesWhereInput>>;
  companyId?: InputMaybe<IntFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userCompanyRoles?: InputMaybe<UsersCompanyRolesListRelationFilter>;
  userId?: InputMaybe<IntFilter>;
  userId_companyId?: InputMaybe<UsersCompaniesUserIdCompanyIdCompoundUniqueInput>;
};

export type UsersCompanyRoles = {
  __typename?: 'UsersCompanyRoles';
  id: Scalars['ID']['output'];
  role: UserCompanyRole;
  userCompanyId: Scalars['Int']['output'];
};

export type UsersCompanyRolesAvgAggregate = {
  __typename?: 'UsersCompanyRolesAvgAggregate';
  id?: Maybe<Scalars['Float']['output']>;
  userCompanyId?: Maybe<Scalars['Float']['output']>;
};

export type UsersCompanyRolesCountAggregate = {
  __typename?: 'UsersCompanyRolesCountAggregate';
  _all: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  role: Scalars['Int']['output'];
  userCompanyId: Scalars['Int']['output'];
};

export type UsersCompanyRolesListRelationFilter = {
  every?: InputMaybe<UsersCompanyRolesWhereInput>;
  none?: InputMaybe<UsersCompanyRolesWhereInput>;
  some?: InputMaybe<UsersCompanyRolesWhereInput>;
};

export type UsersCompanyRolesMaxAggregate = {
  __typename?: 'UsersCompanyRolesMaxAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  role?: Maybe<UserCompanyRole>;
  userCompanyId?: Maybe<Scalars['Int']['output']>;
};

export type UsersCompanyRolesMinAggregate = {
  __typename?: 'UsersCompanyRolesMinAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  role?: Maybe<UserCompanyRole>;
  userCompanyId?: Maybe<Scalars['Int']['output']>;
};

export type UsersCompanyRolesSumAggregate = {
  __typename?: 'UsersCompanyRolesSumAggregate';
  id?: Maybe<Scalars['Int']['output']>;
  userCompanyId?: Maybe<Scalars['Int']['output']>;
};

export type UsersCompanyRolesWhereInput = {
  AND?: InputMaybe<Array<UsersCompanyRolesWhereInput>>;
  NOT?: InputMaybe<Array<UsersCompanyRolesWhereInput>>;
  OR?: InputMaybe<Array<UsersCompanyRolesWhereInput>>;
  id?: InputMaybe<IntFilter>;
  role?: InputMaybe<EnumUserCompanyRoleFilter>;
  userCompanyId?: InputMaybe<IntFilter>;
};

export type VerificationCompanyResponse = {
  __typename?: 'VerificationCompanyResponse';
  city?: Maybe<Scalars['String']['output']>;
  fullAddress?: Maybe<Scalars['String']['output']>;
  houseNumber?: Maybe<Scalars['String']['output']>;
  identificationNumber: Scalars['String']['output'];
  name: Scalars['String']['output'];
  postalCode?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
};

export type VerificationCompanySearch = {
  __typename?: 'VerificationCompanySearch';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  identificationNumber: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export enum VerificationCountryCodes {
  Nl = 'NL'
}

export enum Join__Graph {
  AssignmentApi = 'ASSIGNMENT_API',
  Auth = 'AUTH',
  Contract = 'CONTRACT',
  Core = 'CORE',
  Notification = 'NOTIFICATION',
  Search = 'SEARCH',
  Storage = 'STORAGE',
  Verification = 'VERIFICATION'
}

export enum Link__Purpose {
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY'
}
