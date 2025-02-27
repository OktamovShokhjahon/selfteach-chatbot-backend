import Topic from "../models/Topic.js";

// Get all commands for a topic
export const getTopicCommands = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json(topic.commands);
  } catch (error) {
    console.error("Error in getTopicCommands:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add command to topic
export const addCommand = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const { name, description, example } = req.body;
    topic.commands.push({ name, description, example });
    await topic.save();

    res.json(topic.commands);
  } catch (error) {
    console.error("Error in addCommand:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update command
export const updateCommand = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    const command = topic.commands.id(req.params.commandId);
    if (!command) {
      return res.status(404).json({ message: "Command not found" });
    }

    const { name, description, example } = req.body;
    command.name = name || command.name;
    command.description = description || command.description;
    command.example = example || command.example;

    await topic.save();
    res.json(command);
  } catch (error) {
    console.error("Error in updateCommand:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete command
export const deleteCommand = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    topic.commands = topic.commands.filter(
      (cmd) => cmd._id.toString() !== req.params.commandId
    );
    await topic.save();

    res.json({ message: "Command deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCommand:", error);
    res.status(500).json({ message: "Server error" });
  }
};
