import express from "express";
import { User } from "../models/user.js";
import { Portfolio } from "../models/portfolio.js";


const router = express.Router();

// Get all portfolios for a specific user
router.get("/portfolios/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const portfolios = await Portfolio.find({ user: userId });
    res.status(200).json(portfolios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific portfolio by its ID
router.get("/portfolio/:id", async (req, res) => {
  try {
    const portfolioId = req.params.id;
    const portfolio = await Portfolio.findById(portfolioId);

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addportfolio", async (req, res) => {
  try {
    const { userID, name, headerTitle,email,phoneNo, about, resumeLink, skills, exp, project1, descriptionWithUr1, project2, descriptionWithUr2, githubLinks, linkedinLinks, companyName, start, end, currentlyWorking } = req.body;
    console.log(userID);
    console.log(name);


    if (!userID) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPortfolio = new Portfolio({
      userID: user._id, // Store the user's ObjectID in the portfolio's userID field
      name,
      headerTitle,
      about,
      resumeLink,
      skills,
      email,
      phoneNo,
      companyName,
      exp,
      start,
      end,
      currentlyWorking,
      project1,
      descriptionWithUr1,
      project2,
      descriptionWithUr2,
      githubLinks,
      linkedinLinks
      // Add other portfolio fields here
    });
console.log(newPortfolio);
    const savedPortfolio = await newPortfolio.save();

    // Add the portfolio's data to the user's "portfolios" array
    user.portfolios.push(savedPortfolio.toObject()); // Save a copy of the portfolio data
    await user.save();

    res.status(200).json(savedPortfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an existing portfolio
router.put("/:portfolioId", async (req, res) => {
  try {
    const portfolioId = req.params.portfolioId;
    const updatedPortfolioData = req.body;

    const portfolio = await Portfolio.findById(portfolioId);

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // Update portfolio fields
    portfolio.name = updatedPortfolioData.name;
    portfolio.headerTitle = updatedPortfolioData.headerTitle;
    portfolio.about = updatedPortfolioData.about;
    portfolio.skills = updatedPortfolioData.skills;
    portfolio.resumeLink = updatedPortfolioData.resumeLink;
    portfolio.exp = updatedPortfolioData.exp;
    portfolio.project1 = updatedPortfolioData.project1;
    portfolio.descriptionWithUr1 = updatedPortfolioData.descriptionWithUr1;
    portfolio.project2 = updatedPortfolioData.project2;
    portfolio.descriptionWithUr2 = updatedPortfolioData.descriptionWithUr2;
    portfolio.companyName = updatedPortfolioData.companyName;
    portfolio.exp = updatedPortfolioData.exp;
    portfolio.start = updatedPortfolioData.start;
    portfolio.end = updatedPortfolioData.end;
    portfolio.githubLinks = updatedPortfolioData.githubLinks;
    portfolio.linkedinLinks = updatedPortfolioData.linkedinLinks;
    portfolio.email = updatedPortfolioData.email;
    portfolio.phoneNo = updatedPortfolioData.phoneNo;



    // Update other portfolio fields here

    const updatedPortfolio = await portfolio.save();

    // Find the user associated with this portfolio and update their "portfolios" field
    const user = await User.findById(updatedPortfolio.userID);
    if (user) {
      // Update the portfolio data in the user's "portfolios" array
      const portfolioIndex = user.portfolios.findIndex((p) => p._id.equals(updatedPortfolio._id));
      if (portfolioIndex !== -1) {
        user.portfolios[portfolioIndex] = updatedPortfolio.toObject(); // Update the portfolio data
        await user.save();
      }
    }

    res.status(200).json(updatedPortfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Delete a specific portfolio by its ID
router.delete("/:portfolioId", async (req, res) => {
  try {
    const portfolioId = req.params.portfolioId;
    const deletedPortfolio = await Portfolio.findByIdAndRemove(portfolioId);

    if (!deletedPortfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // Remove the portfolio's data from the user's "portfolios" array
    const user = await User.findById(deletedPortfolio.userID);
    if (user) {
      const portfolioIndex = user.portfolios.findIndex((p) => p._id.equals(deletedPortfolio._id));
      if (portfolioIndex !== -1) {
        user.portfolios.splice(portfolioIndex, 1); // Remove the portfolio data
        await user.save();
      }
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


export { router };
