
from typing import Any


NOTICE = (
    "AI-generated preliminary guidance only. The predicted class "
    "does not confirm a diagnosis. Verify with a qualified local "
    "agricultural expert before making treatment decisions."
)


GENERAL_SYMPTOMS = [
    "Inspect several leaves for unusual spots, discoloration, wilting, or growth.",
    "Check nearby plants and observe whether symptoms are spreading.",
    "Consult a local agricultural expert to confirm the cause.",
]


HEALTHY_GUIDANCE = {
    "Apple": {
        "description": "The model classified this apple leaf as healthy.",
        "symptoms": [
            "Check leaves for normal green coloration.",
            "Inspect leaves and fruit for new spots or discoloration.",
            "Monitor new growth for changes."
        ],
        "recommendations": [
            "Continue routine orchard inspections.",
            "Maintain appropriate irrigation and balanced nutrition.",
            "Remove fallen plant debris when appropriate."
        ],
    },
    "Blueberry": {
        "description": "The model classified this blueberry leaf as healthy.",
        "symptoms": [
            "Check leaves for normal coloration and growth.",
            "Look for unexpected spots, yellowing, or wilting."
        ],
        "recommendations": [
            "Maintain suitable soil moisture and growing conditions.",
            "Monitor leaves and new shoots regularly.",
            "Keep the growing area free of excessive plant debris."
        ],
    },
    "Cherry_(including_sour)": {
        "description": "The model classified this cherry leaf as healthy.",
        "symptoms": [
            "Inspect leaves for unusual spots or powdery growth.",
            "Check new shoots for curling or discoloration."
        ],
        "recommendations": [
            "Maintain appropriate orchard airflow.",
            "Monitor leaves and shoots during new growth.",
            "Remove affected debris where appropriate."
        ],
    },
    "Corn_(maize)": {
        "description": "The model classified this maize leaf as healthy.",
        "symptoms": [
            "Inspect leaves for rust pustules or elongated lesions.",
            "Check for yellowing, drying, or unusual spots.",
            "Monitor neighboring maize plants."
        ],
        "recommendations": [
            "Inspect the crop regularly, particularly during humid conditions.",
            "Maintain balanced crop nutrition and suitable irrigation.",
            "Follow locally recommended crop-residue management."
        ],
    },
    "Grape": {
        "description": "The model classified this grape leaf as healthy.",
        "symptoms": [
            "Check leaves for dark spots or unusual discoloration.",
            "Inspect vines for abnormal growth and fruit damage."
        ],
        "recommendations": [
            "Maintain suitable canopy airflow.",
            "Monitor leaves, berries, and woody parts of vines.",
            "Remove affected debris where appropriate."
        ],
    },
    "Orange": {
        "description": "The model classified this orange leaf as healthy.",
        "symptoms": [
            "Check leaves for blotchy yellow mottling.",
            "Inspect fruit for unusual shape or uneven coloration."
        ],
        "recommendations": [
            "Monitor new leaves and fruit regularly.",
            "Maintain appropriate irrigation and nutrition.",
            "Seek local agricultural advice if citrus greening symptoms appear."
        ],
    },
    "Peach": {
        "description": "The model classified this peach leaf as healthy.",
        "symptoms": [
            "Inspect leaves and fruit for dark spots.",
            "Check for yellow halos, curling, or unusual discoloration."
        ],
        "recommendations": [
            "Monitor new leaves and developing fruit.",
            "Avoid unnecessary prolonged leaf wetness.",
            "Maintain orchard sanitation."
        ],
    },
    "Pepper,_bell": {
        "description": "The model classified this bell pepper leaf as healthy.",
        "symptoms": [
            "Inspect leaves and fruit for water-soaked spots.",
            "Check for yellowing, wilting, or unusual growth."
        ],
        "recommendations": [
            "Use clean planting material.",
            "Avoid handling wet plants when practical.",
            "Monitor leaves and fruit for new symptoms."
        ],
    },
    "Potato": {
        "description": "The model classified this potato leaf as healthy.",
        "symptoms": [
            "Check older leaves for dark spots or concentric rings.",
            "Inspect leaves for rapidly spreading dark lesions."
        ],
        "recommendations": [
            "Monitor potato plants regularly.",
            "Avoid unnecessary leaf wetting.",
            "Seek prompt local advice if rapidly spreading lesions appear."
        ],
    },
    "Raspberry": {
        "description": "The model classified this raspberry leaf as healthy.",
        "symptoms": [
            "Check leaves for discoloration, spots, or scorched margins.",
            "Inspect new shoots for unusual growth."
        ],
        "recommendations": [
            "Maintain suitable irrigation and airflow.",
            "Inspect leaves and shoots regularly.",
            "Remove dead plant material where appropriate."
        ],
    },
    "Soybean": {
        "description": "The model classified this soybean leaf as healthy.",
        "symptoms": [
            "Inspect leaves for yellowing, spots, or unusual discoloration.",
            "Check neighboring plants for similar changes."
        ],
        "recommendations": [
            "Monitor the crop throughout the growing season.",
            "Maintain suitable soil moisture and balanced nutrition.",
            "Follow locally recommended crop management practices."
        ],
    },
    "Squash": {
        "description": "The model classified this squash leaf as healthy.",
        "symptoms": [
            "Check leaves for white powdery patches.",
            "Inspect leaves for yellowing or unusual spots."
        ],
        "recommendations": [
            "Maintain airflow between plants.",
            "Monitor leaves for powdery growth.",
            "Avoid excessive nitrogen fertilization."
        ],
    },
    "Strawberry": {
        "description": "The model classified this strawberry leaf as healthy.",
        "symptoms": [
            "Inspect leaves for reddish-purple spots or scorched areas.",
            "Check for unusual discoloration or drying."
        ],
        "recommendations": [
            "Maintain appropriate spacing and irrigation.",
            "Monitor leaves and new growth regularly.",
            "Remove dead leaves where appropriate."
        ],
    },
    "Tomato": {
        "description": "The model classified this tomato leaf as healthy.",
        "symptoms": [
            "Check leaves for spots, mold, curling, or mosaic patterns.",
            "Inspect the undersides of leaves for pests.",
            "Monitor stems and new growth for changes."
        ],
        "recommendations": [
            "Inspect plants regularly for early symptoms.",
            "Avoid unnecessary prolonged leaf wetness.",
            "Maintain clean tools and suitable airflow."
        ],
    },
}


DISEASE_GUIDANCE = {
    "Apple___Apple_scab": {
        "description": "Apple scab is a fungal disease that can cause scabby lesions on leaves and fruit.",
        "symptoms": [
            "Look for olive-green or dark scabby spots on leaves.",
            "Inspect fruit for rough, scab-like lesions.",
            "Check whether new leaves develop additional spots."
        ],
        "recommendations": [
            "Remove fallen infected leaves where practical.",
            "Improve orchard airflow through appropriate pruning.",
            "Follow local apple-scab management guidance."
        ],
    },
    "Apple___Black_rot": {
        "description": "Apple black rot can affect fruit, leaves, and branches.",
        "symptoms": [
            "Inspect fruit for dark, decaying areas.",
            "Look for circular leaf spots with dark margins.",
            "Check branches for sunken or damaged bark."
        ],
        "recommendations": [
            "Remove affected fruit and plant debris where appropriate.",
            "Inspect branches for signs of disease.",
            "Confirm the diagnosis before selecting a treatment."
        ],
    },
    "Apple___Cedar_apple_rust": {
        "description": "Cedar-apple rust is a fungal disease that can produce distinctive spots on apple leaves.",
        "symptoms": [
            "Look for yellow-orange spots on the upper leaf surface.",
            "Check the underside of leaves for associated structures.",
            "Monitor fruit and new leaves for additional symptoms."
        ],
        "recommendations": [
            "Monitor affected trees and nearby susceptible plants.",
            "Follow locally appropriate orchard management practices.",
            "Seek expert advice before applying fungicides."
        ],
    },
    "Cherry_(including_sour)___Powdery_mildew": {
        "description": "Powdery mildew is a fungal disease that produces powder-like growth on susceptible plant surfaces.",
        "symptoms": [
            "Look for white powdery patches on young leaves.",
            "Check shoots for curling or distortion.",
            "Monitor new growth for spreading patches."
        ],
        "recommendations": [
            "Improve airflow around branches.",
            "Avoid excessive nitrogen fertilization.",
            "Confirm the disease before selecting a locally approved treatment."
        ],
    },
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": {
        "description": "Gray leaf spot is a maize leaf disease associated with rectangular gray or tan lesions.",
        "symptoms": [
            "Look for elongated rectangular lesions between leaf veins.",
            "Check older leaves for gray or tan spots.",
            "Monitor neighboring plants for similar lesions."
        ],
        "recommendations": [
            "Follow locally recommended crop-residue management.",
            "Consider crop rotation and resistant varieties where suitable.",
            "Seek local guidance if lesions spread significantly."
        ],
    },
    "Corn_(maize)___Common_rust_": {
        "description": "Common rust is a fungal disease of maize that produces rust-colored pustules on leaves.",
        "symptoms": [
            "Look for raised reddish-brown pustules on leaf surfaces.",
            "Check whether pustules occur on multiple leaves.",
            "Monitor new leaves for additional rust-colored spots."
        ],
        "recommendations": [
            "Monitor the crop for increasing rust pustules.",
            "Consider resistant maize varieties where available.",
            "Consult local agricultural guidance if the disease spreads."
        ],
    },
    "Corn_(maize)___Northern_Leaf_Blight": {
        "description": "Northern leaf blight is a fungal disease of maize associated with long, cigar-shaped leaf lesions.",
        "symptoms": [
            "Look for elongated, gray-green or tan cigar-shaped lesions.",
            "Check whether lesions expand along the leaf surface.",
            "Inspect nearby maize plants for similar lesions."
        ],
        "recommendations": [
            "Monitor lesion development across the field.",
            "Follow locally recommended crop-residue management and rotation.",
            "Consider resistant varieties suited to the region.",
            "Seek local advice before choosing disease-control products."
        ],
    },
    "Grape___Black_rot": {
        "description": "Grape black rot is a fungal disease that can damage leaves and berries.",
        "symptoms": [
            "Look for brown leaf spots with dark margins.",
            "Inspect berries for dark, shriveled fruit.",
            "Check nearby vines for additional symptoms."
        ],
        "recommendations": [
            "Remove affected berries and debris where appropriate.",
            "Maintain suitable canopy airflow.",
            "Follow local grape disease-management guidance."
        ],
    },
    "Grape___Esca_(Black_Measles)": {
        "description": "Esca is a grapevine disease complex that may affect leaves, berries, and woody tissues.",
        "symptoms": [
            "Look for interveinal leaf discoloration or striped patterns.",
            "Inspect berries for abnormal spotting.",
            "Check woody parts of vines for decline."
        ],
        "recommendations": [
            "Mark affected vines and monitor changes.",
            "Avoid assuming leaf symptoms alone confirm Esca.",
            "Seek specialist advice about vine-health management."
        ],
    },
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
        "description": "Grape leaf blight associated with Isariopsis leaf spot causes spotting and leaf damage.",
        "symptoms": [
            "Look for brown or dark spots on grape leaves.",
            "Check whether spots increase or merge.",
            "Monitor nearby vines for leaf damage."
        ],
        "recommendations": [
            "Remove fallen affected leaves where practical.",
            "Maintain appropriate canopy airflow.",
            "Confirm the cause before choosing a treatment."
        ],
    },
    "Orange___Haunglongbing_(Citrus_greening)": {
        "description": "Citrus greening, also called Huanglongbing, is a serious citrus disease.",
        "symptoms": [
            "Look for blotchy yellow leaf mottling.",
            "Check for uneven fruit coloration or misshapen fruit.",
            "Observe whether symptoms appear on multiple branches."
        ],
        "recommendations": [
            "Contact a local agricultural extension service promptly.",
            "Follow local citrus greening and vector-management guidance.",
            "Do not move potentially infected plant material without checking local rules."
        ],
    },
    "Peach___Bacterial_spot": {
        "description": "Peach bacterial spot can affect leaves and fruit, producing dark lesions.",
        "symptoms": [
            "Look for small dark spots on leaves.",
            "Inspect fruit for sunken spots.",
            "Check for yellow halos or premature leaf damage."
        ],
        "recommendations": [
            "Avoid handling wet foliage when practical.",
            "Monitor nearby trees for similar symptoms.",
            "Confirm bacterial infection before selecting a control measure."
        ],
    },
    "Pepper,_bell___Bacterial_spot": {
        "description": "Bacterial spot affects pepper leaves and fruit, often causing dark or water-soaked lesions.",
        "symptoms": [
            "Look for small water-soaked spots on leaves.",
            "Check fruit for raised or dark lesions.",
            "Inspect nearby pepper plants for similar spots."
        ],
        "recommendations": [
            "Use clean planting material.",
            "Sanitize tools and avoid working with wet plants where practical.",
            "Seek local guidance before choosing a treatment."
        ],
    },
    "Potato___Early_blight": {
        "description": "Potato early blight is a fungal disease commonly associated with dark leaf spots and concentric rings.",
        "symptoms": [
            "Look for dark spots with concentric rings.",
            "Inspect older leaves for yellowing around lesions.",
            "Check lower foliage for increasing damage."
        ],
        "recommendations": [
            "Monitor older leaves and nearby plants.",
            "Manage crop debris and irrigation appropriately.",
            "Confirm the disease before selecting a locally approved treatment."
        ],
    },
    "Potato___Late_blight": {
        "description": "Potato late blight is a potentially fast-spreading disease affecting potato foliage and tubers.",
        "symptoms": [
            "Look for rapidly expanding dark or water-soaked lesions.",
            "Check for pale growth near lesions in humid conditions.",
            "Inspect nearby potato and tomato plants."
        ],
        "recommendations": [
            "Seek prompt local agricultural advice.",
            "Follow local late-blight alerts and management guidance.",
            "Avoid moving potentially infected plant material between fields."
        ],
    },
    "Squash___Powdery_mildew": {
        "description": "Powdery mildew is a fungal disease that produces white powder-like patches on squash leaves.",
        "symptoms": [
            "Look for white patches on the upper or lower leaf surfaces.",
            "Check whether patches spread across more leaves.",
            "Monitor leaves for yellowing or drying."
        ],
        "recommendations": [
            "Improve airflow around plants.",
            "Avoid excessive nitrogen fertilization.",
            "Confirm the diagnosis before selecting an appropriate treatment."
        ],
    },
    "Strawberry___Leaf_scorch": {
        "description": "Strawberry leaf scorch is a leaf disease associated with reddish-purple spots and damaged tissue.",
        "symptoms": [
            "Look for small reddish-purple spots on leaves.",
            "Check whether spots enlarge or cause leaf tissue to dry.",
            "Inspect nearby strawberry plants."
        ],
        "recommendations": [
            "Remove dead or affected leaves where appropriate.",
            "Maintain suitable spacing and irrigation.",
            "Monitor new leaves for recurring symptoms."
        ],
    },
    "Tomato___Bacterial_spot": {
        "description": "Tomato bacterial spot can affect foliage and fruit, causing small dark lesions.",
        "symptoms": [
            "Look for small dark or water-soaked leaf spots.",
            "Inspect fruit for rough or dark spots.",
            "Check nearby tomato plants for similar symptoms."
        ],
        "recommendations": [
            "Use clean planting material.",
            "Avoid unnecessary overhead irrigation.",
            "Confirm bacterial infection before selecting a control measure."
        ],
    },
    "Tomato___Early_blight": {
        "description": "Tomato early blight is a fungal disease often associated with dark leaf lesions and concentric rings.",
        "symptoms": [
            "Look for dark lesions with concentric rings.",
            "Check older leaves for yellowing around spots.",
            "Monitor whether lower leaves show increasing damage."
        ],
        "recommendations": [
            "Remove affected debris where practical.",
            "Reduce prolonged leaf wetness.",
            "Confirm the diagnosis before choosing a locally approved treatment."
        ],
    },
    "Tomato___Late_blight": {
        "description": "Tomato late blight can spread rapidly and damage leaves and stems.",
        "symptoms": [
            "Look for expanding dark or water-soaked lesions.",
            "Inspect stems for darkened areas.",
            "Check nearby potato and tomato plants."
        ],
        "recommendations": [
            "Seek prompt local agricultural advice.",
            "Follow local disease alerts and approved management guidance.",
            "Avoid moving potentially infected plant material."
        ],
    },
    "Tomato___Leaf_Mold": {
        "description": "Tomato leaf mold is associated with fungal growth, particularly under humid growing conditions.",
        "symptoms": [
            "Inspect leaf undersides for olive-green or grayish mold.",
            "Look for pale yellow areas on the upper leaf surface.",
            "Monitor whether affected leaves become dry."
        ],
        "recommendations": [
            "Improve ventilation where practical.",
            "Reduce prolonged leaf humidity.",
            "Remove affected plant debris where appropriate."
        ],
    },
    "Tomato___Septoria_leaf_spot": {
        "description": "Septoria leaf spot is a fungal disease that produces small spots on tomato leaves.",
        "symptoms": [
            "Look for small circular spots with pale centers.",
            "Check for darker margins and tiny dark specks within spots.",
            "Inspect lower leaves for increasing damage."
        ],
        "recommendations": [
            "Remove affected debris where appropriate.",
            "Avoid overhead irrigation where practical.",
            "Monitor nearby plants and confirm the diagnosis."
        ],
    },
    "Tomato___Spider_mites Two-spotted_spider_mite": {
        "description": "Two-spotted spider mites are pests that feed on plant cells and can damage tomato leaves.",
        "symptoms": [
            "Inspect leaf undersides for tiny mites.",
            "Look for fine pale stippling or bronzing.",
            "Check for fine webbing when infestations are substantial."
        ],
        "recommendations": [
            "Inspect several leaves to confirm mite presence.",
            "Monitor the extent of infestation.",
            "Seek local integrated pest-management advice before treatment."
        ],
    },
    "Tomato___Target_Spot": {
        "description": "Tomato target spot is a leaf disease that can cause brown lesions, sometimes with concentric rings.",
        "symptoms": [
            "Look for brown leaf spots with target-like rings.",
            "Inspect lower leaves for spreading lesions.",
            "Check nearby plants for similar damage."
        ],
        "recommendations": [
            "Maintain appropriate airflow.",
            "Reduce prolonged leaf wetness where practical.",
            "Confirm the cause of lesions before selecting a treatment."
        ],
    },
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": {
        "description": "Tomato yellow leaf curl virus can cause leaf curling, yellowing, and stunted growth.",
        "symptoms": [
            "Look for upward curling and yellowing of leaves.",
            "Check for stunted new growth.",
            "Inspect plants for whiteflies, which can transmit the virus."
        ],
        "recommendations": [
            "Seek local guidance on virus and whitefly management.",
            "Monitor nearby plants for similar symptoms.",
            "Follow local advice for handling suspected infected plants."
        ],
    },
    "Tomato___Tomato_mosaic_virus": {
        "description": "Tomato mosaic virus can cause mottled leaf patterns and distorted plant growth.",
        "symptoms": [
            "Look for light and dark green mosaic patterns.",
            "Check for distorted leaves or uneven growth.",
            "Inspect nearby plants for similar patterns."
        ],
        "recommendations": [
            "Clean hands and tools after handling suspect plants.",
            "Use clean seed and planting material where applicable.",
            "Seek local guidance before removing suspected infected plants."
        ],
    },
}


def get_advisory(class_name: str) -> dict[str, Any]:
    """Return crop- and disease-specific preliminary guidance."""

    if not class_name or "___" not in class_name:
        raise ValueError("Invalid disease class name.")

    crop, disease = class_name.split("___", maxsplit=1)
    crop = crop.strip()
    disease = disease.strip()

    if not crop or not disease:
        raise ValueError("Invalid crop or disease name.")

    is_healthy = disease.lower() == "healthy"

    if is_healthy:
        guidance = HEALTHY_GUIDANCE.get(crop)

        if guidance is None:
            guidance = {
                "description": (
                    f"The model classified this {crop} leaf as healthy."
                ),
                "symptoms": GENERAL_SYMPTOMS,
                "recommendations": [
                    "Continue routine crop monitoring.",
                    "Maintain suitable irrigation and balanced nutrition.",
                    "Consult an agricultural expert if unusual symptoms appear.",
                ],
            }

        status = "healthy_class_predicted"

    else:
        guidance = DISEASE_GUIDANCE.get(class_name)

        # Only match the disease suffix if exactly one known disease
        # has that suffix. Do not silently borrow another crop's advice.
        if guidance is None:
            matches = [
                value
                for key, value in DISEASE_GUIDANCE.items()
                if key.split("___", maxsplit=1)[1].lower()
                == disease.lower()
            ]

            if len(matches) == 1:
                guidance = matches[0]

        if guidance is None:
            guidance = {
                "description": (
                    f"The model predicted {disease} in {crop}. "
                    "Specific guidance is not available for this class."
                ),
                "symptoms": GENERAL_SYMPTOMS,
                "recommendations": [
                    "Inspect affected leaves and nearby plants.",
                    "Record whether symptoms are spreading.",
                    "Consult a qualified local agricultural expert before treatment.",
                ],
            }
            status = "general_guidance_only"
        else:
            status = "disease_specific_guidance_available"

    return {
        "crop": crop,
        "predicted_disease": disease,
        "status": status,
        "description": guidance["description"],
        "symptoms": list(guidance["symptoms"]),
        "recommendations": list(guidance["recommendations"]),
        "notice": NOTICE,
    }
