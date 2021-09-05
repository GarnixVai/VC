// from database(original data)
export interface IConfiguration {
    id: number,
    name: string,
    owner: string,
    latestChange: Date,
    metaData?: IMetaData,
    techData?: ITechData
}
// for display table
export interface ITableConfiguration {
    id: number,
    name: string,
    owner: string,
    latestChange: Date,
    metaData: IMetaData,
    techData: ITechData
}

export interface IMetaData{
    config_id?: number,
	name?: string,
	owner?: string,
	configManager: string
}

export interface ITechData{
    config_id?: Number,
	roles: IRole[]
}

export interface IRole{
    name: string,
    permission: string[]
}
// from database(original data)
// for display
export interface IDelta{
    config_id: number,
    editor: string,
	message?: String,
	timestamp: Date | string,
	id?: number,
	change: {
		tech?: ITechData,
		meta?: IMetaData // always have editor
	}
}
