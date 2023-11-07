import {lazy} from "./lazy.ts";
export default (app: {
    directive: (
        arg0: string,
        arg1: { mounted(el: any, binding: any): void }
    ) => void
}) => {
    let lazy;
    app.directive('lazy', lazy)
}

