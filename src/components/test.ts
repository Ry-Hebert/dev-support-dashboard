// import { Principal } from "@dfinity/candid/lib/cjs/idl";
import { Principal } from "@dfinity/principal";

export function serialize(value: unknown): string {
    return JSON.stringify(value, (key, value) => {
        if (value?._isPrincipal) {
            const principal = {
                _isPrincipal: true,
                value: value.toText(),
            }
            console.log('serialized principal', principal);
            return principal;
        }
        return value;
    });
}

export function deserialize(text: string): unknown {
    return JSON.parse(text, (key, value) => {
        if (value?._isPrincipal) {
            const principal = Principal.fromText(value.value);
            console.log('rebuilt principal', principal);
            return principal;
        }
        return value;
    });
}