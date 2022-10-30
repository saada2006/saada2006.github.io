---
title: "Introduction to Molecular Docking"
layout: splash
categories:
    - cheminformatics
---

Molecular docking is a class of algorithms that predict how proteins create bonds with small molecules called ligands. Docking is an important tool in drug discovery. This posts gives a brief description of the algorithm used in UCSF's DOCK project for non-chemistry majors. 

This post is not yet complete, I still need to gather more information over the course of my internship at UCSF.

# Quick Crash Course in Medicinal Chemistry

Medicinal chemistry is the study of medicine. The main goal of medicinal chemistry to create new drugs to cure suffering patients. Drug are chemicals designed to interact with proteins, receptors, enzymes or other chemicals in the body to produce a certain effect. For example, the drug Penicillen, arguably the most signficant discovery in medicine, works by binding to the enzyme DD-transpeptidase which holds a crucial role in repair of the bacterial cell wall. Once the bond has been formed, the enyzme no longer can repair the cell wall, eventually killing the bacteria. 

Clearly, understanding how medcine interacts with chemicals in the body is at the heart of medicinal chemistry. Medicinal chemistry can be viewed as a field dedicated to solving the optimization problem of *which proposed drug produces the most desired effect on the body*? There have been many methods to solving this problem, but most experiment-based methods are extremely slow. In recent years, computational methods like docking have become popular, despite their accuracy. Usually docking is used to narrow down the number of proposed chemicals to test exprimentally.

I'll give a quick crash course in medicinal chemistry right here, but I strongly suggest any reader to read the first 4 chapters of *An Introduction to Medicinal Chemistry* by Graham L. Patrick. 

## Functional Groups

Almost every molecule (besides water) in a living organism is an *organic compound*, meaning that it contains carbon. Carbon is a very versitile element, as it can form four bonds with other atoms. This means that is can form complicated structures. Despite its versitility, carbon barely contributes to the reactivity of a molecule. Instead, carbon bonds with other "submolecules" called *functional groups*. Functional groups are small groups of atoms containing elements such as nitrogen and oxygen that provide the chemical behavior of a compund. You can think of carbon as the skeleton of an organic compund (since it only provides the molecule its structure) and the functional groups as the organs (since they provide the molecule its functionality).

For example, the carbon skeleton of an amino acid usuall exhibs no chemical behavior. However, the skeleton is bonded to an ammonia functional group, which provides the molecule an acidic behavior, and a carboxyl function group, which provides the molecule a basic behavior.  

## Intermolecular and Intramolecular Forces

Intermolecular and intramolecular forces are forces between molecules and inside a molecule specifically. Take water, for instnace, which is shaped like H-O-H where H and O are hydrogen and oxygen atoms respectively. For fancy chemistry reasons, the oxygen atom has a negative charge and the hydrogen atoms have a positive charge. This imbalance of charge creates an attractive property between the hydrogen atom of one water molecule and the oxygen atom of another, forming a *hydrogen bond*. 

Another type of bonding is called Van der Waals interactions. Atoms have a cloud of electrons around them, and sometimes they get close by enough that there is interaction between these electrons. 

## Proteins and Folding

A protein is a *macromolecule*, meaning that it is made up of hundereds of atoms and bonds. Despite this complexity, a protein is made up of a few reduimentary carbon structures. For example, proteins are usually made up of peptide bonds, which are a few peices of carbon connected to each other to make a chain-like strucutre. Functional groups are attached on these chains and have intramolecular interaction with each other. This causes the long chain of proteins to bend into a complex 3D structure like the one below (taken from Chemistry LibreTexts):

![Protein Folding](/assets/cheminformatics/folding.png)

This is called *folding*. The shape formed can have "holes" in it, where our drug can enter and bond in to produce an effect. There are many ways for a molecule to do this, and relative translations and orientations are variables to consider. The goal of docking is the find the optimal bonding configurations and score them to find the best one. This becomes a *combinatorial optimization problem*, something easily solvable using computational methods.

# The Docking Algorithm

The algorithm used in DOCK 3.8 consists of two steps:

1. Orientation sampling. Here, the docking algorithm determines which translations and orientations are the most promising. This is done using a graph-matching algorithm.
2. Chem scoring. Once the program samples an orientation, it calculates a score of how "good" it is. This score takes into account intermolecular forces.
   
Scoring is an intensive process, and many scores have to be calculated to determine the best one. For reference, billions of molecules have to scored to produce any promising results. To improve performance, DOCK 3.8 uses orientation pruning and approximate scoring equations rooted in physics. Even with these optimizations, docking is slow, approximately taking 1 s/mol/core.

## Orientation Sampling

TODO