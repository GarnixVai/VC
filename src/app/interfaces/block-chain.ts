export interface IBlockchainItem{
    hash: string, 
    height: number, 
    time: string | Date,
    block_index: number 
}

export interface IBlockRawUnit{
    bits: number,
    block_index: number,
    fee: number,
    hash: string,
    height: number,
    main_chain: boolean,
    mrkl_root: string,
    n_tx: number,
    next_block: string[],
    nonce: number,
    prev_block: string,
    size: number,
    time: number,
    tx: Itx[],
    ver: number,
    weight: number
}

export interface Itx {
        block_height: number,
        block_index: number,
        double_spend: boolean,
        fee: number,
        hash: string,
        inputs: Iinput[],
        out: Iout[],
        relayed_by: string,
        size: number,
        time: number,
        tx_index: number,
        ver: number,
        vin_sz: number,
        vout_sz: number,
        weight: number,
        isExpended?: boolean
}

export interface Iinput{
        index: number,
        prev_out?: Iout,
        script: string,
        sequence: number,
        witness: string,
        lock_time: number
}

export interface Iout{
    addr: string,
    n: number,
    script: string,
    spending_outpoints: [],
    spent: boolean,
    tx_index: number,
    type: number,
    value: number
}

export interface Itransaction{
    hash: string,
    ver: number,
    vin_sz: number,
    vout_sz: number,
    lock_time: string | Date,
    size: number,
    relayed_by: string,
    block_height: number,
    tx_index: string,
    inputs: Iinput[],
    out: Iout[]
}
