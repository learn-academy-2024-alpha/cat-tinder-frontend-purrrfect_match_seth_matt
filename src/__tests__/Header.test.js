import React from "react";
import { render, screen } from  "@testing-library/react"
import { BrowserRouter} from "react-router-dom"
import Header from "../components/Header"
import pmlLarge from "../assets/Logos/pmlLarge.png"

test("render the Header component", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )
  const headerPerrfectMatchLogo = screen.getByAltText(
    "logo of a cat with a heart in a circle and the name perrfect match adopt a cat below"
  )
  expect(headerPerrfectMatchLogo).toBeInTheDocument()
  expect(headerPerrfectMatchLogo).toHaveAttribute("src", pmlLarge)
  expect(
    screen.getByRole("link", {
      name: "logo of a cat with a heart in a circle and the name perrfect match adopt a cat below"
    })
  ).toHaveAttribute("href", "/")

  const linkToCatIndex = screen.getByText("Meet your Perrfect Match")
  expect(linkToCatIndex).toBeInTheDocument()
  expect(
    screen.getByRole("link", { name: "Meet your Perrfect Match"})
  ).toHaveAttribute("href", "/cat-index")

  const linkToCatNew = screen.getByText("Add a Cat")
  expect(linkToCatNew).toBeInTheDocument()
  expect(
    screen.getByRole("link", { name: "Add a Cat"})
  ).toHaveAttribute("href", "/cat-new")

  const linkToCatAdoption = screen.getByText("Adopt a Cat")
  expect(linkToCatAdoption).toBeInTheDocument()
  expect(
    screen.getByRole("link", { name: "Adopt a Cat"})
  ).toHaveAttribute("href",
    "https://purrfectmatchcatrescue.org/donate?gad_source=1&gclid=CjwKCAjw_LOwBhBFEiwAmSEQAX3HmXgZ5a_mRYW6YEAA4mYh44P2QuiMWTrwcTPVgpTZUHPIvPuP8hoCtswQAvD_Bw"
  )
})


