import path from "path";
import fs from "fs";
import Chance from "chance";
import {
  PatchTestCase,
  Fieldname,
  PatchData,
} from "../interface/booking-api.interface";

// Helper class to manage patch test cases from JSON file
export class PatchDataHelper {
  private jsonFilePath: string;

  constructor(jsonFilePath: string) {
    this.jsonFilePath = path.resolve(jsonFilePath);
  }

  // Reads and returns patch test cases from the JSON file
  getPatchTestCases(): PatchTestCase[] {
    try {
      const rawData = fs.readFileSync(this.jsonFilePath, "utf-8");
      const jsonData = JSON.parse(rawData);
      return jsonData.testCases || [];
    } catch (error) {
      console.error(`Error reading the patch test case file: ${error}`);
      return [];
    }
  }
}

// Initialize Chance.js for random data generation
const chance = new Chance();

// Creates a patch request body based on specified fields to update
export function createPatchRequest(fieldsToUpdate: Fieldname[] = []) {
  // Define all possible fields with their random data generators
  const allFields = {
    firstname: () => chance.first({ gender: "male" }),
    lastname: () => chance.last(),
    totalprice: () => chance.integer({ min: 500, max: 2000 }),
    depositpaid: () => chance.bool(),
    bookingdates: {
      checkin: () => chance.date({ string: true, year: 2025, month: 5 }),
      checkout: () => chance.date({ string: true, year: 2025, month: 6 }),
    },
    additionalneeds: () => chance.sentence({ words: 7 }),
  };

  // Return empty object if no fields specified
  if (fieldsToUpdate.length === 0) {
    return {};
  }

  // Handle special case to update all fields
  if (fieldsToUpdate.includes("all")) {
    return {
      firstname: allFields.firstname(),
      lastname: allFields.lastname(),
      totalprice: allFields.totalprice(),
      depositpaid: allFields.depositpaid(),
      bookingdates: {
        checkin: allFields.bookingdates.checkin(),
        checkout: allFields.bookingdates.checkout(),
      },
      additionalneeds: allFields.additionalneeds(),
    };
  }

  // Create object with only requested fields
  const patchData: PatchData = {};

  // Process each field to update
  fieldsToUpdate.forEach((field) => {
    // Handle special cases for booking dates
    if (field === "bookingdates.checkin") {
      patchData.bookingdates = patchData.bookingdates || {
        checkin: "",
        checkout: "",
      };
      patchData.bookingdates.checkin = allFields.bookingdates.checkin();
    } else if (field === "bookingdates.checkout") {
      patchData.bookingdates = patchData.bookingdates || {
        checkin: "",
        checkout: "",
      };
      patchData.bookingdates.checkout = allFields.bookingdates.checkout();
    } else if (field === "bookingdates") {
      patchData.bookingdates = {
        checkin: allFields.bookingdates.checkin(),
        checkout: allFields.bookingdates.checkout(),
      };
    } else if (field in allFields) {
      (patchData as any)[field] = (allFields as any)[field]();
    }
  });

  return patchData;
}
