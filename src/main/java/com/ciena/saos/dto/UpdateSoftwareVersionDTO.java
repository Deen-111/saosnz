//package com.ciena.saos.dto;
//
//import java.io.Serializable;
//import java.util.List;
//
//import com.ciena.saos.entity.NodeDetail;
//
//import lombok.Data;
//
//@Data
//public class UpdateSoftwareVersionDTO implements Serializable {
//
//	private static final long serialVersionUID = 1L;
//
//	private Long id;
//	private String softwareVersion;
//}
package com.ciena.saos.dto;
import java.io.Serializable;

public record UpdateSoftwareVersionDTO(Long id, String softwareVersion) implements Serializable {

	private static final long serialVersionUID = 1L;
}
