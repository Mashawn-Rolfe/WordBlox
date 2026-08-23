import { describe, it, expect } from "vitest";
import { getLetterStatus, addLetter, removeLetter, getGameStatus, evaluateGuess } from "../utils/gameLogic";

describe("getLetterStatus", () => {
  it("returns green when the letter is in the correct position", () => {
    expect(getLetterStatus("c", 0, "crane")).toBe("green");
  });

  it("returns yellow when the letter exists but is in the wrong position", () => {
    expect(getLetterStatus("r", 0, "crane")).toBe("yellow");
  });

  it("returns gray when the letter is not in the word", () => {
    expect(getLetterStatus("z", 0, "crane")).toBe("gray");
  });

  it("handles duplicate letters correctly", () => {
    const result = evaluateGuess("sheep", "speed");
    expect(result).toEqual([
      "green",
      "gray",
      "green",
      "green",
      "yellow"
    ]);
  });
})

describe("addLetter", () => {
  it("adds a letter to the correct position", () => {
    expect(addLetter("     ", 0, "r"))
      .toBe("r    ");
  });

  it("does not add more than five letters", () => {
    expect(addLetter("react", 5, "x"))
      .toBe("react");
  });
});

describe("removeLetter", () => {
  it("removes the last entered letter", () => {
    expect(removeLetter("rea  ", 3))
      .toBe("re   ");
  });

  it("does nothing when there are no letters", () => {
    expect(removeLetter("     ", 0))
      .toBe("     ");
  });
});

describe("getGameStatus", () => {
  it("returns won when the player guesses correctly", () => {
    expect(getGameStatus("react", "react", 2, 5))
      .toBe("won");
  });

  it("returns invalid for an incomplete word", () => {
    expect(getGameStatus("rea  ", "react", 2, 3))
      .toBe("invalid");
  });

  it("returns lost after the final incorrect guess", () => {
    expect(getGameStatus("wrong", "react", 5, 5))
      .toBe("lost");
  });

  it("allows the game to continue", () => {
    expect(getGameStatus("hello", "react", 2, 5))
      .toBe("continue");
  });
});

describe("evaluateGuess", () => {
  it("marks letters in the correct position as green", () => {
    expect(evaluateGuess("apple", "apple")).toEqual([
      "green",
      "green",
      "green",
      "green",
      "green"
    ]);
  });

  it("marks a correct letter in the wrong position as yellow", () => {
    expect(evaluateGuess("paper", "apple")).toEqual([
      "yellow",
      "yellow",
      "green",
      "yellow",
      "gray"
    ]);
  });

  it("does not mark duplicate letters more times than they appear", () => {
    expect(evaluateGuess("ppppp", "apple")).toEqual([
      "gray",
      "green",
      "green",
      "gray",
      "gray"
    ]);
  });

  it("marks letters that do not exist in the word as gray", () => {
    expect(evaluateGuess("zzzzz", "apple")).toEqual([
      "gray",
      "gray",
      "gray",
      "gray",
      "gray"
    ]);
  });

});
