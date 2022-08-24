export interface OptionItem {
    _id: string;
    name: string;
}
export interface CreateOptionItem {

    name: string;
}
export interface UpdateOptionItem {

    name: string;
}
export interface OptionItemArray {
    all_options:OptionItem[],
    particular_option:OptionItem,
    status:any
  }