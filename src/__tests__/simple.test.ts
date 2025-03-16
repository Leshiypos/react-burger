import {it, expect} from "@jest/globals";
import { checkResponse } from "../util/api";

describe('check checkResponse function',()=>{
	it('should be success', ()=>{
        const testObject = {
            ok: true,
            json: function () {
                return { result: "ok" };
            }
        } as unknown as Response;
		
		const result = checkResponse(testObject);

		expect(result).toEqual({result : "ok"});
	})

	it('should be failde',()=>{
        const testObject = {
            ok: false,
            status: 500
        } as unknown as Response;

        const result = checkResponse(testObject);

        return expect(result).rejects.toBe("Ошибка: 500");
	})
})